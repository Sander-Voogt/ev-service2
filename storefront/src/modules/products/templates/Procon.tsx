import { faCircleMinus, faCirclePlus, faSquareCheck, faSquareMinus, faSquarePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function hasNotValue(obj, key) {
  return !obj || !Object.hasOwn(obj, key) || obj[key] == null || obj[key] === "";
}


export function ProCon({ data }) {
  console.log(data)
  if(hasNotValue(data, "pros") && hasNotValue(data, "cons")){
    return null;
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-2 px-4 mx-auto max-w-screen-xl lg:px-6">
        <h2 className="mb-2 text-xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Plus en minpunten
        </h2>
        <div className="grid pt-2 text-left  md:gap-1 md:grid-cols-2">
          <div>
            <ul>
              {data?.pros?.map(item => (
                <li key={item}><FontAwesomeIcon style={{width: '20px', display: 'inline-block', marginRight: '8px'}} icon={faCirclePlus} color="#338414" />{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <ul>
              {data?.cons?.map(item => (
                <li key={item}><FontAwesomeIcon style={{width: '20px', display: 'inline-block', marginRight: '8px'}} icon={faCircleMinus} color="gray" />{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
