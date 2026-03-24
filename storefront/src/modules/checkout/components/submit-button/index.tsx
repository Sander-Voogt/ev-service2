"use client"

import Button, { ButtonProps } from "@modules/common/components/button"
import React from "react"
import { useFormStatus } from "react-dom"

export function SubmitButton({
  children,
  ...props
}: ButtonProps) {
  const { pending } = useFormStatus()

  return (
    <Button
      variant="primary"
      size="md"
      type="submit"
      isLoading={pending}
      {...props}
    >
      {children}
    </Button>
  )
}
