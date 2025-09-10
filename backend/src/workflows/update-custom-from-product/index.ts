import { ProductDTO } from "@medusajs/framework/types"
import { createWorkflow, when, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { createRemoteLinkStep, dismissRemoteLinkStep, useQueryGraphStep } from "@medusajs/medusa/core-flows"
import { Modules } from "@medusajs/framework/utils"
import { HELLO_MODULE } from "../../modules/hello"
import { deleteCustomStep } from "./steps/delete-custom"
import { updateCustomStep } from "./steps/update-custom"
import { createCustomStep } from "../create-custom-from-product/steps/create-custom"

export type UpdateCustomFromProductStepInput = {
    product: ProductDTO
    additional_data?: {
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
    }
}

export const updateCustomFromProductWorkflow = createWorkflow(
    "update-custom-from-product",
    (input: UpdateCustomFromProductStepInput) => {
        const { data: products } = useQueryGraphStep({
            entity: "product",
            fields: ["custom.*"],
            filters: {
                id: input.product.id,
            },
        })

        const created = when(
            "create-product-custom-link",
            {
                input,
                products,
            }, (data) =>
            !data.products[0].custom &&
            data.input.additional_data?.custom_name?.length > 0
        )
            .then(() => {
                const custom = createCustomStep({
                    custom_name: input.additional_data.custom_name,
                    faq: input.additional_data.faq,
                    video: input.additional_data.video,
                    maindescription: input.additional_data.maindescription,
                    certificering: input.additional_data.certificering,
                    stekker: input.additional_data.stekker,
                    waterbestendigheid: input.additional_data.waterbestendigheid,
                    kabel_lengte: input.additional_data.kabel_lengte,
                    garantie: input.additional_data.garantie,
                    soort: input.additional_data.soort,
                    gewicht: input.additional_data.gewicht,
                    maximaal_laadvermogen: input.additional_data.maximaal_laadvermogen,
                    soort_lader: input.additional_data.soort_lader,
                    vermogen: input.additional_data.vermogen,
                    soort_kabel: input.additional_data.soort_kabel,
                    geadviseerd_voor: input.additional_data.geadviseerd_voor,
                    opties: input.additional_data.opties,
                    lengte: input.additional_data.lengte,
                    type_Stekker: input.additional_data.type_Stekker,
                    laadvermogen: input.additional_data.laadvermogen
                })

                createRemoteLinkStep([{
                    [Modules.PRODUCT]: {
                        product_id: input.product.id,
                    },
                    [HELLO_MODULE]: {
                        custom_id: custom.id,
                    },
                }])

                return custom
            })

        const deleted = when(
            "delete-product-custom-link",
            {
                input,
                products,
            }, (data) =>
            data.products[0].custom && (
                data.input.additional_data?.custom_name === null ||
                data.input.additional_data?.custom_name.length === 0
            )
        )
            .then(() => {
                deleteCustomStep({
                    custom: products[0].custom,
                })

                dismissRemoteLinkStep({
                    [HELLO_MODULE]: {
                        custom_id: products[0].custom.id,
                    },
                })

                return products[0].custom.id
            })

        const updated = when({
            input,
            products,
        }, (data) => data.products[0].custom && data.input.additional_data?.custom_name?.length > 0)
            .then(() => {
                return updateCustomStep({
                    id: products[0].custom.id,
                    custom_name: input.additional_data.custom_name,
                    faq: input.additional_data.faq,
                    video: input.additional_data.video,
                    maindescription: input.additional_data.maindescription,
                    certificering: input.additional_data.certificering,
                    stekker: input.additional_data.stekker,
                    waterbestendigheid: input.additional_data.waterbestendigheid,
                    kabel_lengte: input.additional_data.kabel_lengte,
                    garantie: input.additional_data.garantie,
                    soort: input.additional_data.soort,
                    gewicht: input.additional_data.gewicht,
                    maximaal_laadvermogen: input.additional_data.maximaal_laadvermogen,
                    soort_lader: input.additional_data.soort_lader,
                    vermogen: input.additional_data.vermogen,
                    soort_kabel: input.additional_data.soort_kabel,
                    geadviseerd_voor: input.additional_data.geadviseerd_voor,
                    opties: input.additional_data.opties,
                    lengte: input.additional_data.lengte,
                    type_Stekker: input.additional_data.type_Stekker,
                    laadvermogen: input.additional_data.laadvermogen
                })
            })

        return new WorkflowResponse({
            created,
            updated,
            deleted,
        })


    }
)