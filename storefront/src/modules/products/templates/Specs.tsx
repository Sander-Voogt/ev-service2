import {
  faSquareCheck,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { hasNotValue } from "./Procon";

export function Specs({ data }) {
  if(hasNotValue(data, "soort_kabel") && hasNotValue(data, "certificering") && hasNotValue(data, "waterbestendigheid")){
      return null;
    }
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-2 px-4 mx-auto max-w-screen-xl lg:px-6">
        <h2 className="mb-2 text-xl tracking-tight font-extrabold text-gray-900 dark:text-white">
          Specificaties
        </h2>
        <div className="grid pt-2 text-left  md:gap-1 md:grid-cols-2">
          <div>
            <ul>
              <SpecRow data={data} label="Certificering" itemkey="certificering" />
              <SpecRow data={data} label="Garantie" itemkey="garantie" />
              <SpecRow data={data} label="Geadviseerd voor" itemkey="geadviseerd_voor" />
              <SpecRow data={data} label="Gewicht" itemkey="gewicht" />
              <SpecRow data={data} label="Kabel lengte" itemkey="kabel_lengte" />
              <SpecRow data={data} label="Laadvermogen" itemkey="laadvermogen" />
              <SpecRow data={data} label="Lengte" itemkey="lengte" />
              <SpecRow data={data} label="Maximaal laadvermogen" itemkey="maximaal_laadvermogen" />
              <SpecRow data={data} label="Opties" itemkey="opties" />
              <SpecRow data={data} label="Soort" itemkey="soort" />
              <SpecRow data={data} label="Soort kabel" itemkey="soort_kabel" />
              <SpecRow data={data} label="Soort lader" itemkey="soort_lader" />
              <SpecRow data={data} label="Soort stekker" itemkey="stekker" />
              <SpecRow data={data} label="Type stekker" itemkey="type_Stekker" />
              <SpecRow data={data} label="Vermogen" itemkey="vermogen" />
              <SpecRow data={data} label="Waterbestendigheid" itemkey="waterbestendigheid" />
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function SpecRow({data, label, itemkey}){
  if(hasNotValue(data, itemkey)){
    return null
  }
  return (
    <li>{label}: {data[itemkey]}</li>
  )
}
