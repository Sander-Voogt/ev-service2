import { Metadata } from "next"
import { notFound } from "next/navigation"

import AddressBook from "@modules/account/components/address-book"

import { getRegion } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Adressen",
  description: "Bekijk en beheer je adressen",
}

export default async function Addresses(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params
  const { countryCode } = params
  const customer = await retrieveCustomer()
  const region = await getRegion(countryCode)

  if (!customer || !region) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="addresses-page-wrapper">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-neutral-900">Adressen</h1>
        <p className="text-gray-600 text-sm mt-1">
          Beheer je verzendadressen. Opgeslagen adressen zijn beschikbaar tijdens het afrekenen.
        </p>
      </div>
      <AddressBook customer={customer} region={region} />
    </div>
  )
}
