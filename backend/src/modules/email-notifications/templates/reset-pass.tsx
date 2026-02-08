import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Button,
} from "@react-email/components";
import * as React from "react";
import { Base } from "./base";

export const RESET_PASSWORD = "password-reset";

export interface NewTemplateProps {
  greeting: string;
  reset_url: string;
  preview?: string;
}

export const ResetPasswordEmail = (data: any): data is NewTemplateProps =>
  typeof data.greeting === "string" && typeof data.reset_url === "string";

export const NewTemplate = ({
  greeting,
  reset_url,
  preview = "You have a new message",
}: NewTemplateProps) => (
  <Html>
    <Head />
    <Preview>Wachtwoord reset aanvraag</Preview>
    <Body
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        margin: 0,
        padding: 0,
      }}
    >
      <Container
        style={{
          backgroundColor: "#ffffff",
          padding: "40px",
          borderRadius: "8px",
          maxWidth: "600px",
          margin: "40px auto",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Section>
          <Text
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#2E7D32",
              marginBottom: "20px",
            }}
          >
            Wachtwoord opnieuw instellen
          </Text>

          <Text
            style={{
              fontSize: "16px",
              color: "#333",
              lineHeight: "1.5",
              marginBottom: "30px",
            }}
          >
            We hebben een verzoek ontvangen om je wachtwoord opnieuw in te
            stellen. Klik op de knop hieronder om een nieuw wachtwoord te maken.
          </Text>

          <Button
            pY={12}
            pX={24}
            style={{
              backgroundColor: "#2E7D32",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              display: "inline-block",
            }}
            href={reset_url}
          >
            Wachtwoord opnieuw instellen
          </Button>

          <Text
            style={{
              fontSize: "14px",
              color: "#777",
              lineHeight: "1.5",
              marginTop: "30px",
            }}
          >
            Als je geen wachtwoord reset hebt aangevraagd, kun je deze e-mail
            veilig negeren.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// Add preview props for the email dev server
NewTemplate.PreviewProps = {
  greeting: "Hello there!",
  reset_url: "https://example.com/action",
  preview: "Preview of the new template",
} as NewTemplateProps;
