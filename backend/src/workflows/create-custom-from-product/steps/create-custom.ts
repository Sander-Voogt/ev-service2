import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import HelloModuleService from "../../../modules/hello/service"
import { HELLO_MODULE } from "../../../modules/hello"

type CreateCustomStepInput = {
  id?: string;
  custom_name?: string;
  faq?: Record<string, unknown>;
  maindescription?: string;
  video?: string;
  certificering?: Record<string, unknown>;
  stekker?: Record<string, unknown>;
  waterbestendigheid?: Record<string, unknown>;
  kabel_lengte?: Record<string, unknown>;
  garantie?: Record<string, unknown>;
  soort?: Record<string, unknown>;
  gewicht?: Record<string, unknown>;
  maximaal_laadvermogen?: Record<string, unknown>;
  soort_lader?: Record<string, unknown>;
  vermogen?: Record<string, unknown>;
  soort_kabel?: Record<string, unknown>;
  geadviseerd_voor?: Record<string, unknown>;
  opties?: Record<string, unknown>;
  lengte?: Record<string, unknown>;
  type_Stekker?: Record<string, unknown>;
  laadvermogen?: Record<string, unknown>;
  pros?: Record<string, unknown>;
  cons?: Record<string, unknown>;
}



export const createCustomStep = createStep(
  "create-custom",
  async (data: CreateCustomStepInput, { container }) => {
    if (!data.custom_name && !data.faq) {
      return
    }

    const helloModuleService: HelloModuleService = container.resolve(
      HELLO_MODULE
    )

    const custom = await helloModuleService.createCustoms(data)

    return new StepResponse(custom, custom)
  },
  async (custom, { container }) => {
    const helloModuleService: HelloModuleService = container.resolve(
      HELLO_MODULE
    )

    await helloModuleService.deleteCustoms(custom.id)
  }
)