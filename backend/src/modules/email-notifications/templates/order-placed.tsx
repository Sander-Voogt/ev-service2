import { Text, Section, Hr } from "@react-email/components";
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
  return (
    <Base
      preview={preview}
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f9f9f9",
        color: "#333",
      }}
    >
      <Section
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          padding: "40px",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        }}
      >
        {/* Header */}
        <Text
          style={{
            fontSize: "28px",
            fontWeight: "700",
            textAlign: "center",
            margin: "0 0 30px",
            color: "#1a73e8",
          }}
        >
          Order Bevestiging
        </Text>

        {/* Greeting */}
        <Text style={{ margin: "0 0 15px", fontSize: "16px" }}>
          Beste {shippingAddress.first_name} {shippingAddress.last_name},
        </Text>
        <Text style={{ margin: "0 0 30px", fontSize: "16px" }}>
          Bedankt voor uw bestelling. Hieronder vindt u de details van uw
          bestelling:
        </Text>

        {/* Order Overview */}
        <Text
          style={{
            fontSize: "20px",
            fontWeight: "700",
            margin: "0 0 10px",
            color: "#1a73e8",
          }}
        >
          Besteloverzicht
        </Text>
        <Text style={{ margin: "0 0 5px" }}>Order ID: {order.display_id}</Text>
        <Text style={{ margin: "0 0 5px" }}>
          Besteldatum: {new Date(order.created_at).toLocaleDateString()}
        </Text>
        <Text style={{ margin: "0 0 20px" }}>
          Totaal: {order.summary.raw_current_order_total.value}{" "}
          {order.currency_code}
        </Text>

        <Hr
          style={{
            border: "none",
            borderTop: "1px solid #ddd",
            margin: "20px 0",
          }}
        />

        {/* Shipping Address */}
        <Text
          style={{
            fontSize: "20px",
            fontWeight: "700",
            margin: "0 0 10px",
            color: "#1a73e8",
          }}
        >
          Bezorgadres
        </Text>
        <Text style={{ margin: "0 0 5px" }}>{shippingAddress.address_1}</Text>
        <Text style={{ margin: "0 0 5px" }}>
          {shippingAddress.city}, {shippingAddress.province}{" "}
          {shippingAddress.postal_code}
        </Text>
        <Text style={{ margin: "0 0 20px" }}>
          {shippingAddress.country_code}
        </Text>

        <Hr
          style={{
            border: "none",
            borderTop: "1px solid #ddd",
            margin: "20px 0",
          }}
        />

        {/* Order Items */}
        <Text
          style={{
            fontSize: "20px",
            fontWeight: "700",
            margin: "0 0 15px",
            color: "#1a73e8",
          }}
        >
          Items Bestelling
        </Text>

        <div
          style={{
            width: "100%",
            borderCollapse: "collapse",
            border: "1px solid #ddd",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#f2f2f2",
              padding: "12px 10px",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            <Text>Item</Text>
            <Text>Aantal</Text>
            <Text>Prijs</Text>
          </div>

          {/* Table Items */}
          {order.items.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                borderBottom: "1px solid #ddd",
                fontSize: "15px",
              }}
            >
              <Text>
                {item.title} - {item.product_title}
              </Text>
              <Text>{item.quantity}</Text>
              <Text>
                {item.unit_price} {order.currency_code}
              </Text>
            </div>
          ))}
        </div>

        {/* Footer */}
        <Text
          style={{
            marginTop: "30px",
            fontSize: "14px",
            color: "#666",
            textAlign: "center",
          }}
        >
          Bedankt voor uw bestelling bij ons!
        </Text>
      </Section>
    </Base>
  );
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
