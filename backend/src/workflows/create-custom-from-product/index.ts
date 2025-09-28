import { createWorkflow, transform, when, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { ProductDTO } from "@medusajs/framework/types"
import { createRemoteLinkStep } from "@medusajs/medusa/core-flows"
import { Modules } from "@medusajs/framework/utils"
import { HELLO_MODULE } from "../../modules/hello"
import { createCustomStep } from "./steps/create-custom"

export type CreateCustomFromProductWorkflowInput = {
  product: ProductDTO
  additional_data?: {
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
}

export const createCustomFromProductWorkflow: any = createWorkflow(
  "create-custom-from-product",
  (input: CreateCustomFromProductWorkflowInput) => {
    const customName = transform(
      {
        input,
      },
      (data) => data.input.additional_data.custom_name || ""
    )

    const custom = createCustomStep({
      custom_name: customName,
    })

    when(({ custom }), ({ custom }) => custom !== undefined)
      .then(() => {
        createRemoteLinkStep([{
          [Modules.PRODUCT]: {
            product_id: input.product.id,
          },
          [HELLO_MODULE]: {
            custom_id: custom.id,
          },
        }])
      })

    return new WorkflowResponse({
      custom,
    })
  }
)