import {
  defineMiddlewares,
  validateAndTransformBody,
  validateAndTransformQuery,
} from "@medusajs/framework/http"
import { PostAdminCreateCarBrand } from "./admin/carbrands/validators"
import { PostAdminCreateCarModel } from "./admin/carmodels/validators"
import { z } from "zod"
import { createFindParams } from "@medusajs/medusa/api/utils/validators"
import { PostAdminCreateBrand } from "./admin/brands/validators"
export const GetBrandsSchema: any = createFindParams()



export default defineMiddlewares({



  routes: [
    {
      method: "POST",
      matcher: "/admin/products",
      additionalDataValidator: {
        custom_name: z.string().optional(),
        faq: z.string().optional(),
        video: z.string().optional(),
        maindescription: z.string().optional(),
        certificering: z.string().optional(),
        stekker: z.string().optional(),
        waterbestendigheid: z.string().optional(),
        kabel_lengte: z.string().optional(),
        garantie: z.string().optional(),
        soort: z.string().optional(),
        gewicht: z.string().optional(),
        maximaal_laadvermogen: z.string().optional(),
        soort_lader: z.string().optional(),
        vermogen: z.string().optional(),
        soort_kabel: z.string().optional(),
        geadviseerd_voor: z.string().optional(),
        opties: z.string().optional(),
        lengte: z.string().optional(),
        type_Stekker: z.string().optional(),
        laadvermogen: z.string().optional()
      } as any,
    },


    {
      matcher: "/admin/brands",
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostAdminCreateBrand),
      ],
    },
    {
      matcher: "/admin/products",
      method: ["POST"],
      additionalDataValidator: {
        brand_id: z.string().optional() as any,
      },

    },
    {
      matcher: "/admin/brands",
      method: "GET",
      middlewares: [
        validateAndTransformQuery(
          GetBrandsSchema,
          {
            defaults: [
              "id",
              "name",
              "products.*",
            ],
            isList: true,
          }
        ),
      ],
    },



    {
      matcher: "/admin/carbrands",
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostAdminCreateCarBrand),
      ],
    },
    {
      matcher: "/admin/carmodels",
      method: "POST",
      middlewares: [
        validateAndTransformBody(PostAdminCreateCarModel),
      ],
    },
  ],
})