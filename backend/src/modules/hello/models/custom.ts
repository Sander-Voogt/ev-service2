import { model } from "@medusajs/framework/utils"

export const Custom = model.define("custom", {
  id: model.id().primaryKey(),
  custom_name: model.text().nullable(),
  faq: model.json().nullable(),
  maindescription: model.text().nullable(),
  video: model.text().nullable(),
  certificering: model.json().nullable(),
  stekker: model.json().nullable(),
  waterbestendigheid: model.json().nullable(),
  kabel_lengte: model.json().nullable(),
  garantie: model.json().nullable(),
  soort: model.json().nullable(),
  gewicht: model.json().nullable(),
  maximaal_laadvermogen: model.json().nullable(),
  soort_lader: model.json().nullable(),
  vermogen: model.json().nullable(),
  soort_kabel: model.json().nullable(),
  geadviseerd_voor: model.json().nullable(),
  opties: model.json().nullable(),
  lengte: model.json().nullable(),
  type_Stekker: model.json().nullable(),
  laadvermogen: model.json().nullable(),
  pros: model.json().nullable(),
  cons: model.json().nullable()
})