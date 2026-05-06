type FaqItem = { title?: string; description?: string }

export function Faq({ data }: { data?: FaqItem[] | null }) {
  if (!Array.isArray(data) || data.length === 0) {
    return null
  }

  return (
    <div className="h-full">
      <h2 className="mb-6 text-lg font-semibold tracking-tight text-gray-900 dark:text-white sm:text-xl">
        Veel gestelde vragen
      </h2>
      <ul className="space-y-8 text-left">
        {data.map((item, index) => (
          <li key={index}>
            <h3 className="flex items-start gap-2.5 text-base font-medium text-gray-900 dark:text-white">
              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{item.title}</span>
            </h3>
            <p className="mt-2 pl-7 text-sm leading-relaxed text-gray-600 dark:text-gray-400 sm:text-base">
              {item.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
