import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import { HELLO_MODULE } from "../../../modules/hello"
import HelloModuleService from "../../../modules/hello/service"

type UpdateCustomStepInput = {
  id?: string;
  custom_name?: string;
  faq?: Record<string, unknown>;
  maindescription?: string;
  maindescription_html?: string;
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

export const updateCustomStep = createStep(
  "update-custom",
  async ({ id, custom_name, faq, maindescription, maindescription_html, video, certificering,
    stekker,
    waterbestendigheid,
    kabel_lengte,
    garantie,
    soort,
    gewicht,
    maximaal_laadvermogen,
    soort_lader,
    vermogen,
    soort_kabel,
    geadviseerd_voor,
    opties,
    lengte,
    type_Stekker,
    laadvermogen,
    pros, 
    cons }: UpdateCustomStepInput, { container }) => {
    const helloModuleService: HelloModuleService = container.resolve(
      HELLO_MODULE
    )

    const prevData = await helloModuleService.retrieveCustom(id)

    const custom = await helloModuleService.updateCustoms({
      id,
      custom_name,
      faq,
      maindescription,
      maindescription_html,
      video,
      certificering,
      stekker,
      waterbestendigheid,
      kabel_lengte,
      garantie,
      soort,
      gewicht,
      maximaal_laadvermogen,
      soort_lader,
      vermogen,
      soort_kabel,
      geadviseerd_voor,
      opties,
      lengte,
      type_Stekker,
      laadvermogen,
      pros,
      cons
    })

    return new StepResponse(custom, prevData)
  },
  async (prevData, { container }) => {
    const helloModuleService: HelloModuleService = container.resolve(
      HELLO_MODULE
    )

    await helloModuleService.updateCustoms(prevData)
  }
)