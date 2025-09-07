import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const query = req.scope.resolve("query")

    // Get page and limit from query params, default to page=1, limit=5
    const page = parseInt((req.query?.page as string) || "1", 10)
    const limit = parseInt((req.query?.limit as string) || "5", 10)
    const skip = (page - 1) * limit
    console.log(`[Carbrand API] page=${page}, limit=${limit}, skip=${skip}`)

    const {
        data: brands,
        metadata: { count, take, skip: actualSkip } = {},
    } = await query.graph({
        entity: "carbrand",
        fields: ["name", "id", "created_at", "image", "description"],
        pagination: {
            skip,
            take: limit,
        },
        ...req.queryConfig,
    })

    console.log(`[Carbrand API] returned brands: ${brands.length}, total count: ${count}`)

    res.json({
        brands,
        count,
        limit: take,
        offset: actualSkip,
        page,
    })
}