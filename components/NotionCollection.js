import { galleryVisibilityClassName } from '@/lib/notion/galleryVisibilityClassName'
import { Collection } from 'react-notion-x/build/third-party/collection'

export default function NotionCollection(props) {
  const className = galleryVisibilityClassName(props.collectionView)

  if (!className) return <Collection {...props} />

  return (
    <div className={className}>
      <Collection {...props} />
    </div>
  )
}
