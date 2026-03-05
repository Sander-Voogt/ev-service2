import { Metadata } from "next"

import ProfilePhone from "@modules/account//components/profile-phone"
import ProfileBillingAddress from "@modules/account/components/profile-billing-address"
import ProfileEmail from "@modules/account/components/profile-email"
import ProfileName from "@modules/account/components/profile-name"

import { notFound } from "next/navigation"
import { listRegions } from "@lib/data/regions"
import { retrieveCustomer } from "@lib/data/customer"

export const metadata: Metadata = {
  title: "Profiel",
  description: "Bekijk en bewerk je profielgegevens.",
}

export default async function Profile() {
  const customer = await retrieveCustomer()
  const regions = await listRegions()

  if (!customer || !regions) {
    notFound()
  }

  return (
    <div className="w-full" data-testid="profile-page-wrapper">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-neutral-900">Profiel</h1>
        <p className="text-gray-600 text-sm mt-1">
          Bekijk en bewerk je persoonlijke gegevens, contactinformatie en factuuradres.
        </p>
      </div>
      <div className="flex flex-col gap-y-4 w-full">
        <ProfileName customer={customer} />
        <ProfileEmail customer={customer} />
        <ProfilePhone customer={customer} />
        {/* <ProfileBillingAddress customer={customer} regions={regions} /> */}
      </div>
    </div>
  )
}
