import {
  faSquareCheck,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export function Specs({ data }) {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-2 px-4 mx-auto max-w-screen-xl lg:px-6">
        <h2 className="mb-8 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Specificaties
        </h2>
        <div className="grid grid-rows-2 pt-8 text-left border-t border-gray-200 md:gap-16 dark:border-gray-700 md:grid-cols-2">
          <div>
            <ul>
              <li>Soort kabel: {data.soort_kabel ?? ""}</li>
              <li>Certificering: {data.certificering}</li>
              <li>Standaard: </li>
              <li>Stekker:</li>
              <li>Waterbestendigheid: </li>
              <li>Garantie: </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
