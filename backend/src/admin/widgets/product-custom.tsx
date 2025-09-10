import { defineWidgetConfig } from "@medusajs/admin-sdk";
import { DetailWidgetProps, AdminProduct } from "@medusajs/framework/types";
import {
  Button,
  clx,
  Container,
  Drawer,
  Heading,
  Input,
  Label,
  Text,
} from "@medusajs/ui";
import { useQuery, useMutation } from "@tanstack/react-query";
import { sdk } from "../lib/sdk";
import { useEffect, useState } from "react";
import Faq from "../routes/components/faq";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { watch } from "fs";
import MultiValueInput from "./components/multivalueinput";

type AdminProductBrand = AdminProduct & {
  brand?: {
    id: string;
    name: string;
  };
};

type CustomFields = {
  custom_name: string;
  video?: string;
  faq?: string;
  certificering?: string;
  stekker?: string;
  waterbestendigheid?: string;
  kabel_lengte?: string;
  garantie?: string;
  soort?: string;
  gewicht?: string;
  maximaal_laadvermogen?: string;
  soort_lader?: string;
  vermogen?: string;
  soort_kabel?: string;
  geadviseerd_voor?: string;
  opties?: string;
  lengte?: string;
  type_Stekker?: string;
  laadvermogen?: string;
};

interface AdminProductWithCustom extends AdminProduct {
  custom?: CustomFields; // hier zet je jouw eigen type
}

const ProductBrandWidget = ({
  data: product,
}: DetailWidgetProps<AdminProductWithCustom>) => {
  const { data: queryResult } = useQuery<{ product: AdminProductWithCustom }>({
    queryFn: () =>
      sdk.admin.product.retrieve(product.id, {
        fields: "+custom.*",
      }),
    queryKey: [["product", product.id]],
  });

  const brandName = (queryResult?.product as AdminProductBrand)?.brand?.name;

  console.log(queryResult?.product?.custom);

  const [content, setContent] = useState<CustomFields>(() => {
    return (
      (queryResult?.product?.custom as CustomFields) ?? {
        custom_name: "",
        video: "",
        faq: [],
        certificering: "",
        stekker: "",
        waterbestendigheid: "",
        kabel_lengte: "",
        garantie: "",
        soort: "",
        gewicht: "",
        maximaal_laadvermogen: "",
        soort_lader: "",
        vermogen: "",
        soort_kabel: "",
        geadviseerd_voor: "",
        opties: "",
        lengte: "",
        type_Stekker: "",
        laadvermogen: "",
      }
    );
  });

  useEffect(() => {
    if (queryResult?.product?.custom) {
      setContent(queryResult.product.custom as CustomFields);
    }
  }, [queryResult]);

  const updateProductMutation = useMutation({
    mutationFn: (data: CustomFields) =>
      sdk.admin.product.update(product.id, { additional_data: data } as any),
    onSuccess: () => {
      console.log("✅ Product updated");
      // eventueel: refetch query of laat een toast zien
    },
    onError: (err) => {
      console.error("❌ Failed to update product:", err);
    },
  });

  const submitForm = () => {
    updateProductMutation.mutate(content);
  };

  const form = useForm<CustomFields>({
    // defaultValues: (queryResult?.product?.custom as CustomFields) ?? {
    //   custom_name: "",
    //   faq: [],
    // }

    //@ts-ignore
    defaultValues: queryResult?.product?.custom,
    //@ts-ignore
    values: queryResult?.product?.custom,
  });

  const onSubmit: SubmitHandler<CustomFields> = (data) =>
    updateProductMutation.mutate(data);

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <Heading level="h2">Extra velden</Heading>
        </div>
      </div>
      <div
        className={clx(
          `text-ui-fg-subtle grid grid-cols-2 items-center px-6 py-4`
        )}
      >
        <Drawer>
          <Drawer.Trigger asChild>
            <Button>Edit Variant</Button>
          </Drawer.Trigger>
          <Drawer.Content className="flex flex-col h-full max-h-screen">
            {/* Sticky header */}
            <Drawer.Header className="flex-shrink-0 border-b">
              <Drawer.Title>Edit Variant</Drawer.Title>
            </Drawer.Header>

            {/* Scrollable body */}
            <Drawer.Body className="flex-1 overflow-y-auto p-4">
              <Text>This is where you edit the variant&apos;s details</Text>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <Label>Custom</Label>
                  <Input
                    placeholder="Custom name"
                    id="custom-name"
                    value={form.watch("custom_name")}
                    onChange={(e) =>
                      form.setValue("custom_name", e.target.value)
                    }
                  />
                  <Label>Video</Label>
                  <Input
                    placeholder="Custom name"
                    id="custom-name"
                    value={form.watch("video")}
                    onChange={(e) => form.setValue("video", e.target.value)}
                  />
                  <Faq />

                  <MultiValueInput fieldName="certificering" />
                  <MultiValueInput fieldName="stekker" />
                  <MultiValueInput fieldName="waterbestendigheid" />
                  <MultiValueInput fieldName="kabel_lengte" />
                  <MultiValueInput fieldName="garantie" />
                  <MultiValueInput fieldName="soort" />
                  <MultiValueInput fieldName="gewicht" />
                  <MultiValueInput fieldName="maximaal_laadvermogen" />
                  <MultiValueInput fieldName="soort_lader" />
                  <MultiValueInput fieldName="vermogen" />
                  <MultiValueInput fieldName="soort_kabel" />
                  <MultiValueInput fieldName="geadviseerd_voor" />
                  <MultiValueInput fieldName="opties" />
                  <MultiValueInput fieldName="lengte" />
                  <MultiValueInput fieldName="type_Stekker" />
                  <MultiValueInput fieldName="laadvermogen" />

                  <Button type="submit">Save</Button>
                </form>
              </FormProvider>
            </Drawer.Body>
            <Drawer.Footer>
              <Drawer.Close asChild>
                <Button variant="secondary">Cancel</Button>
              </Drawer.Close>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer>
      </div>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product.details.side.before",
});

export default ProductBrandWidget;
