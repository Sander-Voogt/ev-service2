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
        fields: ["name", "id", "image", "description", "BottomDescription", "created_at", "carmodels.*"],
        ...req.queryConfig,
    })

    console.log(brands)

    res.json({
        brands,
        count,
        limit: take,
        offset: skip,
    })
}