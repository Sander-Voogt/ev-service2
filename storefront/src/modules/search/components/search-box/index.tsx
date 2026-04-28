import { XMarkMini } from "@medusajs/icons"
import { FormEvent } from "react"

import SearchBoxWrapper, {
  ControlledSearchBoxProps,
} from "../search-box-wrapper"

const ControlledSearchBox = ({
  inputRef,
  onChange,
  onReset,
  onSubmit,
  placeholder,
  value,
  ...props
}: ControlledSearchBoxProps) => {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    if (onSubmit) onSubmit(event)
    if (inputRef.current) inputRef.current.blur()
  }

  const handleReset = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()
    onReset(event)
    if (inputRef.current) inputRef.current.focus()
  }

  return (
    <div {...props} className="w-full">
      <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <div className="flex items-center justify-between gap-2">
          <input
            ref={inputRef}
            data-testid="search-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={placeholder || "Zoek naar laadkabels, laadpalen..."}
            spellCheck={false}
            type="search"
            value={value}
            onChange={onChange}
            className="text-[14px] h-9 placeholder:text-[#8a9aa3] focus:outline-none flex-1 bg-transparent text-text-base"
          />
          {value && (
            <button
              onClick={handleReset}
              type="button"
              className="inline-flex items-center justify-center text-text-muted hover:text-text-base focus:outline-none gap-1 px-2 py-1 text-[12px] rounded-md hover:bg-[#f0f3f5] transition-colors"
            >
              <XMarkMini />
              <span>Wissen</span>
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

const SearchBox = () => {
  return (
    <SearchBoxWrapper>
      {(props) => <ControlledSearchBox {...props} />}
    </SearchBoxWrapper>
  )
}

export default SearchBox
