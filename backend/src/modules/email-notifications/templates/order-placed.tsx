import {
  Html,
  Head,
  Body,
  Text,
  Hr,
} from "@react-email/components";
import { Section, Container } from "@react-email/components";
import * as React from "react";
import { Base } from "./base";
import { OrderDTO, OrderAddressDTO } from "@medusajs/framework/types";

export const ORDER_PLACED = "order-placed";

interface OrderPlacedPreviewProps {
  order: OrderDTO & {
    display_id: string;
    summary: { raw_current_order_total: { value: number } };
  };
  shippingAddress: OrderAddressDTO;
}

export interface OrderPlacedTemplateProps {
  order: OrderDTO & {
    display_id: string;
    summary: { raw_current_order_total: { value: number } };
  };
  shippingAddress: OrderAddressDTO;
  preview?: string;
}


export const isOrderPlacedTemplateData = (
  data: any
): data is OrderPlacedTemplateProps =>
  typeof data.order === "object" && typeof data.shippingAddress === "object";

export const OrderPlacedTemplate: React.FC<OrderPlacedTemplateProps> & {
  PreviewProps: OrderPlacedPreviewProps;
} = ({ order, shippingAddress, preview = "Uw bestelling is geplaats!" }) => {
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: order.currency_code,
  });

  const formatPrice = (value: number) =>
    currencyFormatter.format(value);

  const orderDate = new Date(order.created_at).toLocaleDateString(
    "nl-BE",
    { dateStyle: "long" }
  );

  return (
    <Html>
          <Head />
          <Body style={body}>
            <Container style={container}>
              <Text style={title}>Bedankt voor je bestelling</Text>
    
              <Text style={text}>
                Hoi {order.shipping_address.first_name},
              </Text>
    
              <Text style={text}>
                We zijn gestart met het verwerken van je bestelling.
              </Text>
    
              <Text style={text}>
                <strong>Order:</strong> {order.display_id}
                <br />
                <strong>Datum:</strong> {orderDate}
              </Text>
    
              <Hr />
    
              {/* Adres */}
              <table width="100%">
                <tr>
                  <td style={addressTitle}>Verzendadres</td>
                </tr>
                <tr>
                  <td style={addressText}>
                    {renderAddress(shippingAddress)}
                  </td>
                </tr>
              </table>
    
              <Hr />
    
              {/* Items */}
              <table width="100%">
                <tr style={tableHeader}>
                  <th style={th}>Product</th>
                  <th style={th}>Prijs</th>
                  <th style={th}>Aantal</th>
                  <th style={th}>Totaal</th>
                </tr>
    
                {order.items.map((item) => {
                  const total = item.unit_price * item.quantity;
    
                  return (
                    <tr key={item.id} style={tableRow}>
                      <td style={td}>
                        {item.product_title}
                        <br />
                        <small>{item.title}</small>
                      </td>
                      <td style={tdRight}>
                        {formatPrice(item.unit_price)}
                      </td>
                      <td style={tdCenter}>{item.quantity}</td>
                      <td style={tdRight}>
                        {formatPrice(total)}
                      </td>
                    </tr>
                  );
                })}
    
                {/* Totaal */}
                <tr>
                  <td />
                  <td colSpan={2} style={summary}>
                    Bestelling totaal
                  </td>
                  <td style={summaryStrong}>
                    {formatPrice(
                      order.summary.raw_current_order_total.value
                    )}
                  </td>
                </tr>
              </table>
    
              <Text style={text}>
                Deze e-mail is verstuurd naar {order.email}
              </Text>
    
              <Text style={text}>
                Bedankt voor je vertrouwen,
                <br />
                <strong>EV Service</strong>
              </Text>
            </Container>
          </Body>
        </Html>
    // <Base preview={preview}>
    //   <Section
    //     style={{
    //       backgroundColor: "#f9f9f9",
    //       padding: "40px 0",
    //       fontFamily: "Arial, sans-serif",
    //       color: "#333",
    //     }}
    //   >
    //     <Container
    //       style={{
    //         maxWidth: "600px",
    //         margin: "0 auto",
    //         padding: "40px",
    //         backgroundColor: "#ffffff",
    //         borderRadius: "8px",
    //         boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    //       }}
    //     >
    //       {/* Header */}
    //       <Text
    //         style={{
    //           fontSize: "28px",
    //           fontWeight: "700",
    //           textAlign: "center",
    //           margin: "0 0 30px",
    //           color: "#1a73e8",
    //         }}
    //       >
    //         Order Bevestiging
    //       </Text>

    //       {/* Greeting */}
    //       <Text style={{ margin: "0 0 15px", fontSize: "16px" }}>
    //         Beste {shippingAddress.first_name} {shippingAddress.last_name},
    //       </Text>
    //       <Text style={{ margin: "0 0 30px", fontSize: "16px" }}>
    //         Bedankt voor uw bestelling. Hieronder vindt u de details van uw
    //         bestelling:
    //       </Text>

    //       {/* Order Overview */}
    //       <Text
    //         style={{
    //           fontSize: "20px",
    //           fontWeight: "700",
    //           margin: "0 0 10px",
    //           color: "#1a73e8",
    //         }}
    //       >
    //         Besteloverzicht
    //       </Text>
    //       <Text style={{ margin: "0 0 5px" }}>
    //         Order ID: {order.display_id}
    //       </Text>
    //       <Text style={{ margin: "0 0 5px" }}>
    //         Besteldatum: {new Date(order.created_at).toLocaleDateString()}
    //       </Text>
    //       <Text style={{ margin: "0 0 20px" }}>
    //         Totaal: {order.summary.raw_current_order_total.value}{" "}
    //         {order.currency_code}
    //       </Text>

    //       <Hr
    //         style={{
    //           border: "none",
    //           borderTop: "1px solid #ddd",
    //           margin: "20px 0",
    //         }}
    //       />

    //       {/* Shipping Address */}
    //       <Text
    //         style={{
    //           fontSize: "20px",
    //           fontWeight: "700",
    //           margin: "0 0 10px",
    //           color: "#1a73e8",
    //         }}
    //       >
    //         Bezorgadres
    //       </Text>
    //       <Text style={{ margin: "0 0 5px" }}>{shippingAddress.address_1}</Text>
    //       <Text style={{ margin: "0 0 5px" }}>
    //         {shippingAddress.city}, {shippingAddress.province}{" "}
    //         {shippingAddress.postal_code}
    //       </Text>
    //       <Text style={{ margin: "0 0 20px" }}>
    //         {shippingAddress.country_code}
    //       </Text>

    //       <Hr
    //         style={{
    //           border: "none",
    //           borderTop: "1px solid #ddd",
    //           margin: "20px 0",
    //         }}
    //       />

    //       {/* Order Items */}
    //       <Text
    //         style={{
    //           fontSize: "20px",
    //           fontWeight: "700",
    //           margin: "0 0 15px",
    //           color: "#1a73e8",
    //         }}
    //       >
    //         Items Bestelling
    //       </Text>

    //       <div
    //         style={{
    //           width: "100%",
    //           borderCollapse: "collapse",
    //           border: "1px solid #ddd",
    //           borderRadius: "6px",
    //           overflow: "hidden",
    //         }}
    //       >
    //         {/* table Header */}
    //         <div
    //           style={{
    //             display: "flex",
    //             justifyContent: "space-between",
    //             backgroundColor: "#f2f2f2",
    //             padding: "12px 10px",
    //             fontWeight: "600",
    //             fontSize: "16px",
    //           }}
    //         >
    //           <Text>Item</Text>
    //           <Text>Aantal</Text>
    //           <Text>Prijs</Text>
    //         </div>

    //         {/* table Items */}
    //         {order.items.map((item) => (
    //           <div
    //             key={item.id}
    //             style={{
    //               display: "flex",
    //               justifyContent: "space-between",
    //               padding: "10px",
    //               borderBottom: "1px solid #ddd",
    //               fontSize: "15px",
    //             }}
    //           >
    //             <Text>
    //               {item.title} - {item.product_title}
    //             </Text>
    //             <Text>{item.quantity}</Text>
    //             <Text>
    //               {item.unit_price} {order.currency_code}
    //             </Text>
    //           </div>
    //         ))}
    //       </div>

    //       {/* Footer */}
    //       <Text
    //         style={{
    //           marginTop: "30px",
    //           fontSize: "14px",
    //           color: "#666",
    //           textAlign: "center",
    //         }}
    //       >
    //         Bedankt voor uw bestelling bij ons!
    //       </Text>
    //     </Container>
    //   </Section>
    // </Base>
  );
};


/* Helpers */

const renderAddress = (address: Record<string, any>) => (
  <>
    {address.first_name} {address.last_name}
    <br />
    {address.address_1}
    <br />
    {address.postal_code} {address.city}
    {address.province && `, ${address.province}`}
    <br />
    {address.country_code}
  </>
);

/* Styles */

const body = {
  backgroundColor: "#f4f4f4",
  fontFamily: "Verdana, Geneva, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  padding: "20px",
  margin: "0 auto",
  maxWidth: "600px",
};

const title = {
  color: "#34810d",
  fontSize: "24px",
  fontWeight: "bold",
};

const text = {
  fontSize: "14px",
  color: "#333",
  lineHeight: "1.5",
};

const addressTitle = {
  fontWeight: "bold",
  fontSize: "14px",
};

const addressText = {
  fontSize: "12px",
};

const tableHeader = {
  backgroundColor: "#b9babe",
};

const th = {
  fontSize: "12px",
  padding: "6px",
};

const tableRow = {
  backgroundColor: "#ebecee",
};

const td = {
  fontSize: "12px",
  padding: "8px",
};

const tdRight = {
  ...td,
  textAlign: "right" as const,
};

const tdCenter = {
  ...td,
  textAlign: "center" as const,
};

const summary = {
  backgroundColor: "#dde2e6",
  padding: "8px",
  fontSize: "12px",
  textAlign: "right" as const,
};

const summaryStrong = {
  ...summary,
  fontWeight: "bold",
};

OrderPlacedTemplate.PreviewProps = {
  order: {
    id: "test-order-id",
    display_id: "ORD-123",
    created_at: new Date().toISOString(),
    email: "test@example.com",
    currency_code: "USD",
    items: [
      {
        id: "item-1",
        title: "Item 1",
        product_title: "Product 1",
        quantity: 2,
        unit_price: 10,
      },
      {
        id: "item-2",
        title: "Item 2",
        product_title: "Product 2",
        quantity: 1,
        unit_price: 25,
      },
    ],
    shipping_address: {
      first_name: "Test",
      last_name: "User",
      address_1: "123 Main St",
      city: "Anytown",
      province: "CA",
      postal_code: "12345",
      country_code: "US",
    },
    summary: { raw_current_order_total: { value: 45 } },
  },
  shippingAddress: {
    first_name: "Test",
    last_name: "User",
    address_1: "123 Main St",
    city: "Anytown",
    province: "CA",
    postal_code: "12345",
    country_code: "US",
  },
} as OrderPlacedPreviewProps;

export default OrderPlacedTemplate;
