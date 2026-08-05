export function galleryVisibilityClassName(collectionView) {
  if (collectionView?.type !== 'gallery') return ''

  const {
    gallery_properties,
    gallery_title_visible,
    show_page_icon
  } = collectionView.format || {}
  const titleProperty = gallery_properties?.find(
    property => property.property === 'title'
  )

  return [
    (show_page_icon === false ||
      (show_page_icon == null && gallery_title_visible == null)) &&
      'notion-gallery-hide-page-icons',
    (titleProperty
      ? titleProperty.visible === false
      : gallery_title_visible === false) && 'notion-gallery-hide-titles'
  ]
    .filter(Boolean)
    .join(' ')
}
