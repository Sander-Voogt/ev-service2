"use client"

import { useState } from "react"
import { updateCart } from "@lib/data/cart"

export const AddCartReference: React.FC = () => {
  const [reference, setReference] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!reference) return

    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const cart = await updateCart({
        metadata: { reference },
      })

      console.log("Updated cart:", cart)
      setSuccess(true)
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Kon de referentie niet toevoegen.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="reference" className="font-medium">
        Voeg een referentie toe
      </label>

      <input
        id="reference"
        type="text"
        value={reference}
        onChange={(e) => setReference(e.target.value)}
        className="border p-2 rounded"
        placeholder="Bijv. 'Interne referentie 123'"
      />

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading || !reference}
        className="transition-fg relative inline-flex w-fit items-center justify-center overflow-hidden rounded-md outline-none disabled:bg-ui-bg-disabled disabled:border-ui-border-base disabled:text-ui-fg-disabled disabled:shadow-buttons-neutral disabled:after:hidden after:transition-fg after:absolute after:inset-0 after:content-[''] shadow-buttons-neutral text-ui-fg-base bg-ui-button-neutral after:button-neutral-gradient hover:bg-ui-button-neutral-hover hover:after:button-neutral-hover-gradient active:bg-ui-button-neutral-pressed active:after:button-neutral-pressed-gradient focus-visible:shadow-buttons-neutral-focus txt-compact-small-plus gap-x-1.5 px-3 py-1.5 h-10"
      >
        {loading ? "Opslaan..." : "Opslaan"}
      </button>

      {success && (
        <p className="text-green-600">Referentie succesvol toegevoegd!</p>
      )}

      {error && <p className="text-red-600">{error}</p>}
    </div>
  )
}