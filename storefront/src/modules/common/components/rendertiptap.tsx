type Props = {
  html?: string
}

export default function ProductDescription({ html }: Props) {
  if (!html) return null

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
