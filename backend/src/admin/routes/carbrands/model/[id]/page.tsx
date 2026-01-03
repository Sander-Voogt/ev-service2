import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Container,
  Heading,
  Input,
  Label,
  Tabs,
  Toaster,
  toast,
} from "@medusajs/ui";
import { sdk } from "../../../../lib/sdk";
import { useQuery } from "@tanstack/react-query";
import { Controller, FormProvider, useForm } from "react-hook-form";
import MyEditor from "../../../../components/CKEditor";
import Laadkabels from "./Laadkabel";
import UploadPage from "./Upload";
import DropzoneUpload from "../../../components/MediaUpload";

const CustomPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  type CarModel = {
    id: string;
    name: string;
    image: string;
    PictureId: string;
    title: string | null;
    description: string | null;
    ModelBannerDescription: string | null;
  };

  const { data, isLoading } = useQuery<CarModel>({
    queryFn: () => sdk.client.fetch(`/admin/carmodels/${id}`),
    queryKey: ["carmodel", id],
  });

  const form = useForm<CarModel>({
    defaultValues: data,
    values: data, // zorgt dat query data in form komt
  });

  const onSubmit = async (formValues: CarModel) => {
    setLoading(true);
    try {
      // sdk.client.fetch returns the parsed JSON body directly
      const res = await sdk.client.fetch<{ car_model: any }>(
        `/admin/carmodels/${id}`,
        {
          method: "POST",
          // The SDK handles JSON Content-Type and body stringification automatically
          body: formValues,
        }
      );

      // If the request reaches here, it was successful (2xx status)
      toast.success("Success", {
        description: "Record updated successfully",
        duration: 5000,
      });

      console.log("Updated model:", res);
    } catch (error) {
      // Non-2xx statuses throw an error automatically
      console.error(error);
      toast.error("Fout", {
        //@ts-ignore
        description: error.message || String(error),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = (uploads) => {
    form.setValue("image", uploads);
  };
  const handleUploadCompletePic = (uploads) => {
    form.setValue("PictureId", uploads);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <FormProvider {...form}>
      <Toaster />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Container className="divide-y p-0">
          <div className="flex items-center justify-between px-6 py-4">
            <Heading level="h1">Car Model: {data?.name}</Heading>
            <Button type="submit" disabled={loading}>
              {loading ? "Opslaan..." : "Save"}
            </Button>
          </div>
          <Tabs defaultValue="general">
            <Tabs.List>
              <Tabs.Trigger value="general">General</Tabs.Trigger>
              <Tabs.Trigger value="SEO">SEO</Tabs.Trigger>
              <Tabs.Trigger value="laadkabels">Laadkabels</Tabs.Trigger>
            </Tabs.List>
            <div className="mt-2">
              <Tabs.Content value="general">
                <Label className="text-gray-500">Name</Label>
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field }) => <Input {...field} />}
                />

                <Label className="text-gray-500">Title</Label>
                <Controller
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <Input {...field} value={field.value ?? ""} />
                  )}
                />

                <Label className="text-gray-500">Description</Label>
                <MyEditor
                  value={form.watch("description") || ""}
                  onChange={(value) => form.setValue("description", value)}
                />

                <Label className="text-gray-500">Header description</Label>
                <MyEditor
                  value={form.watch("ModelBannerDescription") || ""}
                  onChange={(value) =>
                    form.setValue("ModelBannerDescription", value)
                  }
                />
                {data?.image ?? <img src={data?.image} />}
                <DropzoneUpload onUpload={handleUploadComplete} />
                {data?.PictureId ?? <img src={data?.PictureId} />}
                <DropzoneUpload onUpload={handleUploadCompletePic} />
              </Tabs.Content>

              <Tabs.Content value="laadkabels">
                <Laadkabels />
              </Tabs.Content>
            </div>
          </Tabs>
        </Container>
      </form>
    </FormProvider>
  );
};

export default CustomPage;
