import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { IAuthModuleService } from "@medusajs/framework/types"
import { Modules } from "@medusajs/framework/utils"

// src/api/store/custom/reset-password/route.ts
export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
    const { email } = req.body as { email: string }
    console.log("Received password reset request for email:", email)
    if (!email) {
        return res.status(400).json({ message: "Email is required" })
    }

    const authModuleService = req.scope.resolve<IAuthModuleService>(Modules.AUTH)
    const customerModule = req.scope.resolve(Modules.CUSTOMER)

    // Stap 1: Zoek bestaande auth identity via provider identity
    let authIdentity
    const providerIdentities = await authModuleService.listProviderIdentities({
        provider: "emailpass",
        entity_id: email
    })

    console.log("Provider identities found:", providerIdentities.length)

    if (providerIdentities.length > 0) {
        authIdentity = await authModuleService.retrieveAuthIdentity(
            providerIdentities[0].auth_identity_id
        )
    } else {
        // Geen identity → check customer
        const [customer] = await customerModule.listCustomers({ email })

        console.log(customer)
        if (!customer) {
            // Privacy: altijd succes melden
            return res.status(200).json({ message: "If an account exists, a reset email was sent." })
        }

        // Maak nieuwe AuthIdentity (zonder password)
        const newAuthIdentity = await authModuleService.createAuthIdentities([{
            app_metadata: { customer_id: customer.id }
        }])

        authIdentity = newAuthIdentity[0]

        // Koppel provider identity (emailpass + entity_id = email)
        await authModuleService.createProviderIdentities([{
            auth_identity_id: authIdentity.id,
            provider: "emailpass",
            entity_id: email,
            provider_metadata: {}  // geen password hash → forced reset
        }])
    }

    //   // Stap 2: Genereer reset token → triggert email
    //   await authModuleService.generateResetToken("emailpass", {
    //     entity_id: email,
    //     actor_type: "customer"
    //   })

    return res.status(200).json({ message: "If an account exists, a reset email was sent." })
}