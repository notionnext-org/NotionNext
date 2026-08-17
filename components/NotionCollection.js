import { galleryVisibilityClassName } from '@/lib/notion/galleryVisibilityClassName'
import { Collection } from 'react-notion-x/build/third-party/collection'

export default function NotionCollection(props) {
  const viewId = props.block?.view_ids?.[0]
  const collectionViewRecord = props.ctx?.recordMap?.collection_view?.[viewId]
  const collectionView = collectionViewRecord?.value || collectionViewRecord
  const className = galleryVisibilityClassName(collectionView)

  if (!className) return <Collection {...props} />

  return (
    <div className={className}>
      <Collection {...props} />
    </div>
  )
}
