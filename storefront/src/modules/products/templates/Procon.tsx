import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function hasNotValue(obj, key) {
  return !obj || !Object.hasOwn(obj, key) || obj[key] == null || obj[key] === "";
}


export function ProCon({ data }) {
  if(hasNotValue(data, "pros") && hasNotValue(data, "cons")){
    return null;
  }

  return (
    <div className="h-full">
      <h2 className="mb-4 text-lg font-semibold tracking-tight text-gray-900 dark:text-white sm:text-xl">
        Plus en minpunten
      </h2>
      <div className="grid gap-6 text-left md:grid-cols-2 md:gap-8">
        <div>
          <ul className="space-y-2.5 text-sm text-gray-700 dark:text-gray-300 sm:text-base">
            {data?.pros?.map((item) => (
              <li key={item} className="flex gap-2.5 leading-snug">
                <FontAwesomeIcon
                  className="mt-0.5 shrink-0"
                  style={{ width: "18px" }}
                  icon={faCirclePlus}
                  color="#338414"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <ul className="space-y-2.5 text-sm text-gray-700 dark:text-gray-300 sm:text-base">
            {data?.cons?.map((item) => (
              <li key={item} className="flex gap-2.5 leading-snug">
                <FontAwesomeIcon
                  className="mt-0.5 shrink-0"
                  style={{ width: "18px" }}
                  icon={faCircleMinus}
                  color="gray"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
