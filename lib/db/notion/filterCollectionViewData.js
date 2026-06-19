function filterCollectionViewData(blockMap) {
  if (!blockMap?.collection_view || !blockMap?.collection_query) return

  const inheritedFilters = getInheritedCollectionViewFilters(blockMap)

  Object.values(blockMap.collection_view).forEach(entry => {
    const view = entry?.value?.value || entry?.value || entry
    if (!view?.id) return

    const collectionId = view?.format?.collection_pointer?.id
    const filter = getCollectionViewFilter(view) || inheritedFilters[view.id]
    const collection = getRecordById(blockMap.collection, collectionId)
    const schema = collection?.value?.schema || collection?.schema || {}
    const collectionQuery = getRecordById(blockMap.collection_query, collectionId)
    const viewQuery = getRecordById(collectionQuery, view.id)

    if (!collectionId || !filter || !viewQuery) return

    filterBlockIdsInPlace(viewQuery, blockId => {
      const block = blockMap.block?.[blockId]?.value
      return matchesCollectionFilter(block, filter, schema)
    })

    if (Array.isArray(view.page_sort)) {
      view.page_sort = view.page_sort.filter(blockId => {
        const block = blockMap.block?.[blockId]?.value
        return matchesCollectionFilter(block, filter, schema)
      })
    }
  })
}

function getInheritedCollectionViewFilters(blockMap) {
  const inheritedFilters = {}

  Object.values(blockMap.block || {}).forEach(entry => {
    const block = entry?.value || entry
    if (block?.type !== 'collection_view' || !Array.isArray(block.view_ids)) {
      return
    }

    const firstSiblingFilter = block.view_ids
      .map(viewId => {
        const view = getRecordById(blockMap.collection_view, viewId)
        const viewValue = view?.value?.value || view?.value || view
        return getCollectionViewFilter(viewValue)
      })
      .find(Boolean)

    if (!firstSiblingFilter) return

    block.view_ids.forEach(viewId => {
      const view = getRecordById(blockMap.collection_view, viewId)
      const viewValue = view?.value?.value || view?.value || view
      if (!getCollectionViewFilter(viewValue)) {
        inheritedFilters[viewValue?.id || viewId] = firstSiblingFilter
      }
    })
  })

  return inheritedFilters
}

function getCollectionViewFilter(view) {
  const filters = []

  if (Array.isArray(view?.format?.property_filters)) {
    filters.push(
      ...view.format.property_filters
        .map(filterItem => normalizePropertyFilter(filterItem))
        .filter(Boolean)
    )
  }

  if (view?.query2?.filter) {
    const queryFilter = normalizeFilter(view.query2.filter)
    if (queryFilter) filters.push(queryFilter)
  }

  if (filters.length === 0) return null
  if (filters.length === 1) return filters[0]

  return {
    operator: view?.filter_operator || 'and',
    filters
  }
}

function normalizeFilter(filter) {
  if (!filter || typeof filter !== 'object') return null

  if (Array.isArray(filter.filters)) {
    return {
      operator: filter.operator || 'and',
      filters: filter.filters
        .map(child => normalizeFilter(child))
        .filter(Boolean)
    }
  }

  return normalizePropertyFilter(filter)
}

function normalizePropertyFilter(filterItem) {
  const property = filterItem?.property || filterItem?.filter?.property
  const filter = filterItem?.filter?.filter || filterItem?.filter

  if (!property || !filter) return null

  return {
    property,
    filter
  }
}

function filterBlockIdsInPlace(value, predicate) {
  if (!value || typeof value !== 'object') return

  if (Array.isArray(value.blockIds)) {
    value.blockIds = value.blockIds.filter(predicate)
  }

  Object.values(value).forEach(child => filterBlockIdsInPlace(child, predicate))
}

function matchesCollectionFilter(block, filter, schema = {}) {
  if (!block?.properties) return false

  if (Array.isArray(filter?.filters)) {
    const matcher = child => matchesCollectionFilter(block, child, schema)
    return filter.operator === 'or'
      ? filter.filters.some(matcher)
      : filter.filters.every(matcher)
  }

  const propertyId = filter?.property
  const propertyFilter = filter?.filter
  if (!propertyId || !propertyFilter) return true

  const values = getPropertyValues(block.properties[propertyId])
  return matchesFilter(values, propertyFilter, schema[propertyId])
}

function matchesPropertyFilters(block, filters, schema = {}) {
  return matchesCollectionFilter(
    block,
    { operator: 'and', filters: filters.map(normalizePropertyFilter) },
    schema
  )
}

function matchesFilter(values, filter, propertySchema) {
  const expectedValues = getExpectedValues(filter.value, propertySchema)
  const actualValues = expandPropertyValues(values, propertySchema)
  const actualText = actualValues.join(' ')
  const expectedText = expectedValues.join(' ')

  switch (filter.operator) {
    case 'enum_is':
    case 'status_is':
      return expectedValues.some(value => actualValues.includes(value))
    case 'enum_is_not':
    case 'status_is_not':
      return expectedValues.every(value => !actualValues.includes(value))
    case 'enum_contains':
    case 'multi_select_contains':
      return expectedValues.some(value => actualValues.includes(value))
    case 'enum_does_not_contain':
    case 'multi_select_does_not_contain':
      return expectedValues.every(value => !actualValues.includes(value))
    case 'string_contains':
      return expectedValues.some(value =>
        actualValues.some(current => current.includes(value))
      )
    case 'string_does_not_contain':
      return expectedValues.every(value =>
        actualValues.every(current => !current.includes(value))
      )
    case 'string_is':
      return expectedValues.some(value => actualValues.includes(value))
    case 'string_is_not':
      return expectedValues.every(value => !actualValues.includes(value))
    case 'string_starts_with':
      return expectedValues.some(value => actualText.startsWith(value))
    case 'string_ends_with':
      return expectedValues.some(value => actualText.endsWith(value))
    case 'checkbox_is':
      return toBoolean(actualValues[0]) === toBoolean(expectedValues[0])
    case 'checkbox_is_not':
      return toBoolean(actualValues[0]) !== toBoolean(expectedValues[0])
    case 'number_equals':
      return toNumber(actualValues[0]) === toNumber(expectedValues[0])
    case 'number_does_not_equal':
      return toNumber(actualValues[0]) !== toNumber(expectedValues[0])
    case 'number_greater_than':
      return toNumber(actualValues[0]) > toNumber(expectedValues[0])
    case 'number_less_than':
      return toNumber(actualValues[0]) < toNumber(expectedValues[0])
    case 'number_greater_than_or_equal_to':
      return toNumber(actualValues[0]) >= toNumber(expectedValues[0])
    case 'number_less_than_or_equal_to':
      return toNumber(actualValues[0]) <= toNumber(expectedValues[0])
    case 'date_is':
      return normalizeDate(actualValues[0]) === normalizeDate(expectedValues[0])
    case 'date_is_before':
      return normalizeDate(actualValues[0]) < normalizeDate(expectedValues[0])
    case 'date_is_after':
      return normalizeDate(actualValues[0]) > normalizeDate(expectedValues[0])
    case 'date_is_on_or_before':
      return normalizeDate(actualValues[0]) <= normalizeDate(expectedValues[0])
    case 'date_is_on_or_after':
      return normalizeDate(actualValues[0]) >= normalizeDate(expectedValues[0])
    case 'relation_contains':
    case 'person_contains':
      return expectedValues.some(value => actualValues.includes(value))
    case 'relation_does_not_contain':
    case 'person_does_not_contain':
      return expectedValues.every(value => !actualValues.includes(value))
    case 'is_empty':
      return actualValues.length === 0
    case 'is_not_empty':
      return actualValues.length > 0
    default:
      return true
  }
}

function getPropertyValues(property) {
  if (!Array.isArray(property)) return []

  const values = []

  property.forEach(item => {
    const plainValue = item?.[0]
    if (plainValue !== undefined && plainValue !== null && plainValue !== '') {
      values.push(String(plainValue))
    }

    item?.[1]?.forEach(decoration => {
      const metadata = decoration?.[1]
      ;[
        metadata?.id,
        metadata?.page_id,
        metadata?.user_id,
        metadata?.value,
        metadata?.start_date
      ].forEach(value => {
        if (value !== undefined && value !== null && value !== '') {
          values.push(String(value))
        }
      })
    })
  })

  return [...new Set(values)]
}

function getExpectedValues(value, propertySchema) {
  if (Array.isArray(value)) {
    return value.flatMap(item => getExpectedValues(item, propertySchema))
  }

  if (value?.value !== undefined && value?.value !== null) {
    return expandStatusGroupValue(String(value.value), propertySchema)
  }
  if (value?.start_date) return [value.start_date]
  if (value?.id) return [value.id]
  if (value !== undefined && value !== null) return [String(value)]

  return []
}

function expandPropertyValues(values, propertySchema) {
  if (propertySchema?.type !== 'status') return values

  const groupValues = propertySchema.groups
    ?.filter(group =>
      propertySchema.options?.some(
        option => values.includes(option.value) && group.optionIds?.includes(option.id)
      )
    )
    .map(group => group.name)

  return [...new Set([...values, ...(groupValues || [])])]
}

function expandStatusGroupValue(value, propertySchema) {
  if (propertySchema?.type !== 'status') return [value]

  const group = propertySchema.groups?.find(group => group.name === value)
  if (!group) return [value]

  const optionValues = propertySchema.options
    ?.filter(option => group.optionIds?.includes(option.id))
    .map(option => option.value)
    .filter(optionValue => typeof optionValue === 'string')

  return [value, ...(optionValues || [])]
}

function toBoolean(value) {
  return value === true || value === 'true' || value === 'Yes' || value === '1'
}

function toNumber(value) {
  const number = Number(value)
  return Number.isNaN(number) ? null : number
}

function normalizeDate(value) {
  if (!value) return ''
  return String(value).slice(0, 10)
}

function getRecordById(record, id) {
  if (!record || !id) return null

  for (const candidate of getIdCandidates(id)) {
    const value = record[candidate]
    if (value) return value
  }

  return null
}

function getIdCandidates(id) {
  const candidates = new Set([id])

  if (typeof id === 'string') {
    const compactId = id.replace(/-/g, '')
    candidates.add(compactId)

    if (/^[0-9a-fA-F]{32}$/.test(compactId)) {
      candidates.add(
        [
          compactId.slice(0, 8),
          compactId.slice(8, 12),
          compactId.slice(12, 16),
          compactId.slice(16, 20),
          compactId.slice(20)
        ].join('-')
      )
    }
  }

  return [...candidates]
}

export {
  filterCollectionViewData,
  matchesCollectionFilter,
  matchesPropertyFilters
}
