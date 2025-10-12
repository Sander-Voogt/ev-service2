import { ModuleProvider, Modules } from "@medusajs/framework/utils"
import MontaFulfillmentProviderService from "./service"

export default ModuleProvider(Modules.FULFILLMENT, {
  services: [MontaFulfillmentProviderService],
})
