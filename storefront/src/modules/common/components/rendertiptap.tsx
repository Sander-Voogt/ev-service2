type Props = {
  html: {
    maindescription_html?: string
  }
}

export default function ProductDescription({ html }: Props) {
  if (!html?.maindescription_html) return null

  return (
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: html?.maindescription_html }}
    />
  )
}
