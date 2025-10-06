import {
    createStep,
    StepResponse,
    createWorkflow,
    WorkflowResponse
} from "@medusajs/framework/workflows-sdk"
import { CARMODEL_MODULE } from "../modules/carmodel"
import CarModelModuleService from "../modules/carmodel/service"

export type CreateBrandStepInput = {
  id: string;
  name: string;
  title?: string | null;
  intro?: string | null;
  description?: string | null;
  image?: string | null;
  PictureId?: string | null;
  Description?: string | null;
  MetaKeywords?: string | null;
  MetaDescription?: string | null;
  MetaTitle?: string | null;
  Published?: number | null;
  Deleted?: boolean | null;
  DisplayOrder?: number | null;
  CreatedOnUtc?: Date | null;
  UpdatedOnUtc?: Date | null;
  ModelBannerId?: string | null;
  ChargingStationDescription?: string | null;
  ChargingCableDescription?: string | null;
  AccessoriesDescription?: string | null;
  ModelBannerDescription?: string | null;
  CableType?: number | null;
  is1F16A?: number | null;
  is1F32A?: number | null;
  is3F16A?: number | null;
  is3F32A?: number | null;
  CablePictureId?: number | null;
  StructuredData?: string | null;
  H1Title?: string | null;
}

export const createBrandStep = createStep(
    "create-carmodel-step",
    async (input: CreateBrandStepInput, { container }) => {
        const carmodelModuleService: CarModelModuleService = container.resolve(
            CARMODEL_MODULE
        )

        const carmodelbrand = await carmodelModuleService.createCarmodels(input)

        return new StepResponse(carmodelbrand, carmodelbrand.id)
    },
    async (id: string, { container }) => {
        const brandModuleService: CarModelModuleService = container.resolve(
            CARMODEL_MODULE
        )

        await brandModuleService.deleteCarmodels(id)
    }

)


export const createCarModelWorkflow = createWorkflow(
    "create-carmodel",
    (input: CreateBrandStepInput) => {
        const brand = createBrandStep(input)

        return new WorkflowResponse(brand)
    }
)