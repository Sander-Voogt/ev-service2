import { XMarkMini } from "@medusajs/icons"
import { FormEvent } from "react"
import { useRouter } from "next/navigation"

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

    if (onSubmit) {
      onSubmit(event)
    }

    if (inputRef.current) {
      inputRef.current.blur()
    }
  }

  const handleReset = (event: FormEvent) => {
    event.preventDefault()
    event.stopPropagation()

    onReset(event)

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div {...props} className="w-full">
      <form action="" noValidate onSubmit={handleSubmit} onReset={handleReset}>
        <div className="flex items-center justify-between gap-4">
          <input
            ref={inputRef}
            data-testid="search-input"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            placeholder={placeholder || "Search for products..."}
            spellCheck={false}
            type="search"
            value={value}
            onChange={onChange}
            className="text-xl h-12 placeholder:text-white/70 placeholder:transition-colors focus:outline-none flex-1 bg-transparent font-semibold text-white"
          />
          {value && (
            <button
              onClick={handleReset}
              type="button"
              className="items-center justify-center text-white hover:text-white/90 focus:outline-none gap-x-3 px-6 py-3 text-base font-bold flex bg-white/20 hover:bg-white/30 rounded-2xl transition-all duration-300 backdrop-blur-sm"
            >
              <XMarkMini />
              <span>Clear</span>
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

const SearchBox = () => {
  const router = useRouter()

  return (
    <SearchBoxWrapper>
      {(props) => {
        return (
          <>
            <ControlledSearchBox {...props} />
          </>
        )
      }}
    </SearchBoxWrapper>
  )
}

export default SearchBox