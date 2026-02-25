// src/api/store/auth-identities/route.ts
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
    // console.log('asdfasdfasdfasdf')
    const email = req.query.email as string | undefined


    if (!email) {
        return res.status(400).json({ message: "email is required" })
    }

    const authModuleService = req.scope.resolve(Modules.AUTH)

    // 1) Create auth identity for emailpass provider
    const authIdentity = await authModuleService.createAuthIdentities({
        provider_identities: [
            {
                provider: "emailpass",
                entity_id: email, // email as identifier,
                user_metadata:{
                    
                }
            },
        ],
    })

    // 2) Now you can trigger reset‑password for this email
    // via workflow or the public auth route (see below)

    return res.json({ auth_identity: authIdentity })
}
