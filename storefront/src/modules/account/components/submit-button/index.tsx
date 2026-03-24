"use client"

import Button, { ButtonProps } from "@modules/common/components/button"

export const SubmitButton = ({ children = "Opslaan", ...props }: Partial<ButtonProps>) => {
  return (
    <Button
      variant="primary"
      size="md"
      type="submit"
      {...props}
    >
      {children}
    </Button>
  )
}

export default SubmitButton