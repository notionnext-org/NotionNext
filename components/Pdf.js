export function Pdf({ file }) {
  if (!file) return null

  return (
    <object data={file} type='application/pdf' width='100%' height='100%'>
      <a href={file} target='_blank' rel='noopener noreferrer'>
        打开 PDF
      </a>
    </object>
  )
}
