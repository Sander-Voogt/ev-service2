import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const query = req.scope.resolve("query")

    const {
        data: brands,
        metadata: { count, take, skip } = {},
    } = await query.graph({
        entity: "carbrand",
        fields: ["name", "id", "image", "PictureId", "description", "BottomDescription", "created_at", "carmodels.*"],
        pagination: {
            order: {
                name: "ASC",
            }
        },
        ...req.queryConfig,
    })


    res.json({
        brands,
        count,
        limit: take,
        offset: skip,
    })
}