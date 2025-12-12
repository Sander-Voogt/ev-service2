// MainDescriptionWrapper.tsx
import {
  DetailWidgetProps,
  AdminProductCategory,
} from "@medusajs/framework/types";
import { sdk } from "../lib/sdk";
import { useQuery } from "@tanstack/react-query";
// MainDescriptionForm.tsx
import { Button, Container, FocusModal, Heading, Label } from "@medusajs/ui";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import TiptapEditor from "../components/CKEditor";
import { defineWidgetConfig } from "@medusajs/admin-sdk";

const MainDescriptionWrapper = ({
  data: productCategory,
}: DetailWidgetProps<AdminProductCategory>) => {
  const { data: queryResult } = useQuery({
    queryKey: ["productCategory", productCategory.id],
    queryFn: () => sdk.admin.productCategory.retrieve(productCategory.id),
  });

  if (!queryResult) return <div>Loading...</div>;

  return (
    <MainDescriptionForm
      productCategoryId={productCategory.id}
      metadata={queryResult.product_category.metadata || {}}
    />
  );
};

type CustomFields = {
  maindescription: {
    json: string;
    html: string;
  };
  ChargingStationDescription: {
    json: string;
    html: string;
  };
  ChargingCableDescription: {
    json: string;
    html: string;
  };
  AccessoriesDescription: {
    json: string;
    html: string;
  };
  ModelBannerDescription: {
    json: string;
    html: string;
  };
};

type Props = {
  productCategoryId: string;
  metadata: any;
};

const MainDescriptionForm = ({ productCategoryId, metadata }: Props) => {
  const form = useForm<CustomFields>({
    defaultValues: {
      maindescription: metadata.maindescription || "",
      ChargingStationDescription: metadata.ChargingStationDescription || "",
      ChargingCableDescription: metadata.ChargingCableDescription || "",
      AccessoriesDescription: metadata.AccessoriesDescription || "",
      ModelBannerDescription: metadata.ModelBannerDescription || "",
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: CustomFields) =>
      sdk.admin.productCategory.update(productCategoryId, {
        metadata: { ...metadata, ...data },
      }),
    onSuccess: (_, variables) => {
      // direct resetten van de form met nieuwe values
      form.reset({ ...metadata, ...variables });
      console.log("✅ Metadata updated");
    },
    onError: (err) => {
      console.error("❌ Failed to update metadata", err);
    },
  });

  const onSubmit: SubmitHandler<CustomFields> = (data) =>
    updateMutation.mutate(data);

  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">Productbeschrijving</Heading>
      </div>

      <FocusModal>
        <FocusModal.Trigger asChild>
          <Button>Edit Description</Button>
        </FocusModal.Trigger>
        <FocusModal.Content>
          <FocusModal.Header>
            <FocusModal.Title>Edit Description</FocusModal.Title>
            <Button type="submit" className="mt-4" form="dd">
              Save
            </Button>
          </FocusModal.Header>

          <FocusModal.Body className="flex flex-col items-center py-4 max-h-[70vh] overflow-y-auto">
            <div className="flex w-full max-w-lg flex-col gap-y-8">
              <FormProvider<CustomFields> {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} id="dd">
                  <Label>Main description</Label>
                  <TiptapEditor
                    value={form.watch("maindescription.json") || ""}
                    onChange={(json, html) =>
                      //@ts-ignore
                      form.setValue("maindescription", {
                        json: json,
                        html: html,
                      })
                    }
                  />
                  <Label>ModelBannerDescription</Label>
                  <TiptapEditor
                    value={form.watch("ModelBannerDescription.json") || ""}
                    onChange={(json, html) =>
                      //@ts-ignore
                      form.setValue("ModelBannerDescription", {
                        json: json,
                        html: html,
                      })
                    }
                  />
                  <Label>AccessoriesDescription</Label>
                  <TiptapEditor
                    value={form.watch("AccessoriesDescription.json") || ""}
                    onChange={(json, html) =>
                      //@ts-ignore
                      form.setValue("AccessoriesDescription", {
                        json: json,
                        html: html,
                      })
                    }
                  />
                  <Label>ChargingCableDescription</Label>
                  <TiptapEditor
                    value={form.watch("ChargingCableDescription.json") || ""}
                    onChange={(json, html) =>
                      //@ts-ignore
                      form.setValue("ChargingCableDescription", {
                        json: json,
                        html: html,
                      })
                    }
                  />
                  <Label>ChargingStationDescription</Label>
                  <TiptapEditor
                    value={form.watch("ChargingStationDescription.json") || ""}
                    onChange={(json, html) =>
                      //@ts-ignore
                      form.setValue("ChargingStationDescription", {
                        json: json,
                        html: html,
                      })
                    }
                  />
                </form>
              </FormProvider>
            </div>
          </FocusModal.Body>
        </FocusModal.Content>
      </FocusModal>
    </Container>
  );
};

export const config = defineWidgetConfig({
  zone: "product_category.details.side.before",
});

export default MainDescriptionWrapper;
