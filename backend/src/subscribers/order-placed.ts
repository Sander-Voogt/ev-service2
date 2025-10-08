import { Modules } from '@medusajs/framework/utils'
import { INotificationModuleService, IOrderModuleService } from '@medusajs/framework/types'
import { SubscriberArgs, SubscriberConfig } from '@medusajs/medusa'
import { EmailTemplates } from '../modules/email-notifications/templates'

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  const notificationModuleService: INotificationModuleService = container.resolve(Modules.NOTIFICATION)
  const orderModuleService: IOrderModuleService = container.resolve(Modules.ORDER)

  const order = await orderModuleService.retrieveOrder(data.id, { relations: ['items', 'summary', 'shipping_address'] })
  const shippingAddress = await (orderModuleService as any).orderAddressService_.retrieve(order.shipping_address.id)

  try {
    await notificationModuleService.createNotifications({
      to: order.email,
      channel: 'email',
      template: EmailTemplates.ORDER_PLACED,
      data: {
        emailOptions: {
          replyTo: 'helpdesk@evservice.eu',
          subject: 'Bestelling is geplaatst'
        },
        order,
        shippingAddress,
        preview: 'Bedankt voor uw bestelling!'
      }
    })
  } catch (error) {
    console.error('Error sending order confirmation notification:', error)
  }

  const customerModuleService = container.resolve("customer")



  let customer
  let currentAddress
  let currentOrder
  let isExistingCustomer: boolean | null = null

  try {
    currentOrder = await orderModuleService.retrieveOrder(order.id, {
      relations: ["billing_address"],
    })
    console.log(currentOrder)
    // 1. Haal de klant op via customerModuleService
    customer = await customerModuleService.retrieveCustomer(currentOrder.customer_id, {
      relations: ["addresses"],
    })

    console.log(customer)

    isExistingCustomer = customer.has_account
  } catch (err) {
    console.error(`❌ Fout bij ophalen klant ${order.id}:`, err)
    return // Stop hier als we klant niet kunnen ophalen
  }

  // 2. Bepaal of het een gast is
  if (isExistingCustomer === true) {
    console.log("✅ Geregistreerde klant:", customer.email)
    createInvoiceInInformer(customer.metadata.informer_id, order.id, order.items)
    return
  }

  if (isExistingCustomer === false) {
    console.log("👤 Gastklant:", customer.email)

    const informerData = await createCustomerInInformer(currentOrder)
    createInvoiceInInformer(informerData.id, order.id, order.items)

    if (informerData?.id) {
      try {
        await customerModuleService.updateCustomers(customer.id, {
          metadata: {
            informer_id: informerData.id,
          },
          
        })

        console.log(`📌 Klant geüpdatet met informer_id: ${informerData.id}`)
      } catch (err) {
        console.error(`❌ Fout bij updaten klant ${customer.id}:`, err)
      }
    }
  }

  console.log(`Order ${order.id} geplaatst door klant ${customer.email}`)
}


// Vergeet niet je createCustomer functie te importeren of definiëren
async function createCustomerInInformer(customer: any) {


  const businessCustomer = customer.billing_address.company ? "1" : "0"

  const newCustomer = {
    relation_number: "0",
    relation_type: businessCustomer,
    company_name: customer.billing_address.company_name,
    firstname: customer.billing_address.first_name,
    surname_prefix: "",
    surname: customer.billing_address.last_name,
    street: customer.billing_address.address_1,
    house_number: '-',
    house_number_suffix: "",
    zip: customer.billing_address.postal_code,
    city: customer.billing_address.city,
    country: customer.billing_address.country_code.toUpperCase(),
    phone_number: customer.billing_address.phone,
    fax_number: "",
    web: "",
    email: customer.email,
    coc: "",
    vat: "",
    iban: "",
    bic: "",
    email_invoice: customer.email,
    sales_invoice_template_id: "515360",
    payment_condition_id: "677869",
  }

  console.log("📤 Relatie aanmaken in Informer:", newCustomer)

  try {
    const response = await fetch("https://api.informer.eu/v1/relation", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Securitycode: "30751083",
        Apikey: "BtmlQbpSBD1e2UjxvRUy7QlkIpfhbudQ99ifbFjHr5XEz9Ebd5s",
      },
      body: JSON.stringify(newCustomer),
    })

    const contentType = response.headers.get("content-type") || ""

    if (!response.ok) {
      const errorBody = contentType.includes("application/json")
        ? await response.json()
        : await response.text()

      console.error(`❌ Mislukt om relatie aan te maken:`, errorBody)
      return null
    }

    const result = await response.json()
    console.log(`✅ Relatie succesvol aangemaakt voor ${customer.email}`, result)
    return result
  } catch (err) {
    console.error(`❌ Fout bij aanmaken relatie voor ${customer.email}:`, err)
    return null
  }
}

// Vergeet niet je createCustomer functie te importeren of definiëren
async function createInvoiceInInformer(customerId, orderId, items) {

  const newCustomer = {
    relation_id: customerId,
    reference: orderId,
    payment_condition_id: 368912,
    currency_id: 61551,
    vat_option: 'incl',
    template_id: 515360,
    footer: "Factuur naar aanleiding van bestelling op evservice.eu. Bestelnummer staat als referentie bovenaan de factuur.",
    lines: [
      items.map(item => (
        {
          qty: item.quantity,
          description: item.title + " - " + item.product_title,
          amount: item.unit_price,
          vat_id: 677633,
          ledger_id: 14516798,
        }
      ))

    ]
  }

  console.log("📤 Relatie aanmaken in Informer:", newCustomer)

  try {
    const response = await fetch("https://api.informer.eu/v1/invoice/sales/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Securitycode: "30751083",
        Apikey: "BtmlQbpSBD1e2UjxvRUy7QlkIpfhbudQ99ifbFjHr5XEz9Ebd5s",
      },
      body: JSON.stringify(newCustomer),
    })

    const contentType = response.headers.get("content-type") || ""

    if (!response.ok) {
      const errorBody = contentType.includes("application/json")
        ? await response.json()
        : await response.text()

      console.error(`❌ Mislukt om Factuur aan te maken:`, errorBody)
      return null
    }

    const result = await response.json()
    console.log(`✅ Factuur succesvol aangemaakt voor ${orderId}`, result)
    return result
  } catch (err) {
    console.error(`❌ Fout bij aanmaken Factuur voor ${orderId}:`, err)
    return null
  }
}


export const config: SubscriberConfig = {
  event: 'order.placed'
}
