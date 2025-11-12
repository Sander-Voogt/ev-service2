import { Text } from '@react-email/components'
import * as React from 'react'
import { Base } from './base'

export const RESET_PASSWORD = 'password-reset'

export interface NewTemplateProps {
  greeting: string
  reset_url: string
  preview?: string
}

export const ResetPasswordEmail = (data: any): data is NewTemplateProps =>
  typeof data.greeting === 'string' && typeof data.reset_url === 'string'

export const NewTemplate = ({ greeting, reset_url, preview = 'You have a new message' }: NewTemplateProps) => (
  <Base preview={preview}>
    <Text>{greeting}</Text>
    <Text>Click <a href={reset_url}>here</a> to take action.</Text>
  </Base>
)

// Add preview props for the email dev server
NewTemplate.PreviewProps = {
  greeting: 'Hello there!',
  reset_url: 'https://example.com/action',
  preview: 'Preview of the new template'
} as NewTemplateProps