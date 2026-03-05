"use client"

import { Disclosure } from "@headlessui/react"
import { useEffect } from "react"
import useToggleState from "@lib/hooks/use-toggle-state"
import SubmitButton from "../submit-button"

type AccountInfoProps = {
  label: string
  currentInfo: string | React.ReactNode
  isSuccess?: boolean
  isError?: boolean
  errorMessage?: string
  clearState: () => void
  children?: React.ReactNode
  "data-testid"?: string
}

const AccountInfo = ({
  label,
  currentInfo,
  isSuccess,
  isError,
  clearState,
  errorMessage = "Er is een fout opgetreden, probeer het opnieuw",
  children,
  "data-testid": dataTestid,
}: AccountInfoProps) => {
  const { state, toggle, close } = useToggleState()

  const handleToggle = () => {
    clearState()
    toggle()
  }

  useEffect(() => {
    if (isSuccess) {
      close()
    }
  }, [isSuccess, close])

  // helper voor panels: open = pointer-events auto, gesloten = none
  const panelClass = (open: boolean) =>
    `transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden ${
      open ? "max-h-[1000px] opacity-100 pointer-events-auto" : "max-h-0 opacity-0 pointer-events-none"
    }`

  return (
    <div className="bg-gray-50 rounded-xl p-5 border border-gray-200" data-testid={dataTestid}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-500">{label}</span>
          <div className="flex items-center gap-2">
            {typeof currentInfo === "string" ? (
              <span className="font-semibold text-neutral-900" data-testid="current-info">
                {currentInfo}
              </span>
            ) : (
              currentInfo
            )}
          </div>
        </div>
        <button
          onClick={handleToggle}
          type={state ? "reset" : "button"}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            state ? "bg-gray-200 text-gray-700 hover:bg-gray-300" : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
          data-testid="edit-button"
          data-active={state}
        >
          {state ? "Annuleren" : "Bewerken"}
        </button>
      </div>

      {/* Success message */}
      <Disclosure>
        <Disclosure.Panel static className={panelClass(!!isSuccess)} data-testid="success-message">
          <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-green-600"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-green-700">{label} succesvol bijgewerkt</span>
          </div>
        </Disclosure.Panel>
      </Disclosure>

      {/* Error message */}
      <Disclosure>
        <Disclosure.Panel static className={panelClass(!!isError)} data-testid="error-message">
          <div className="flex items-center gap-2 mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-red-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
            <span className="text-sm text-red-700">{errorMessage}</span>
          </div>
        </Disclosure.Panel>
      </Disclosure>

      {/* Edit panel */}
      <Disclosure>
        <Disclosure.Panel static className={panelClass(!!state)}>
          <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
            {children}
            <div className="flex items-center justify-end pt-2">
              <SubmitButton />
            </div>
          </div>
        </Disclosure.Panel>
      </Disclosure>
    </div>
  )
}

export default AccountInfo