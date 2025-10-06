import { sdk } from "@lib/config"
import { string_to_slug } from "../slugger"
import Image from "next/image";
import { getCollectionByHandle } from "@lib/data/collections";
import { getProductsList } from "@lib/data/products";
import FeaturedProducts from "@modules/home/components/featured-products";
import { getRegion } from "@lib/data/regions";

export async function generateStaticParams() {
  const response = await sdk.client.fetch(`/store/carbrand/models`);
  const brands = response.brands ?? response.data ?? [];

  if (!brands) return [];

  const params = brands.flatMap((brand) =>
    (brand.carmodels || []).map((model) => ({
      brand: string_to_slug(brand.name),
      model: string_to_slug(model.name),
    }))
  );

  return params;
}

export default async function ModelPage({
  params,
}: {
  params: { countryCode: string; brand: string; model: string }
}) {
    const region = await getRegion(params.countryCode)
  
  const response = await sdk.client.fetch(`/store/carbrand/models`);
  const brands = response.brands ?? response.data ?? [];

  const brand = brands.find(
    (b) => string_to_slug(b.name) === params.brand
  );

  const model = brand?.carmodels.find(
    (m) => string_to_slug(m.name) === params.model
  );

  if (!brand || !model) {
    return <div>Model niet gevonden</div>;
  }
  
  const collections = await getCollectionByHandle("laadkabels-type-2")
  const { response:laadkabels } = await getProductsList({
    queryParams: { collection_id: collections.id },
    countryCode: params.countryCode,
  })

  const laadpalendata = await getCollectionByHandle("laadpalen")
  const { response:laadpalen } = await getProductsList({
    queryParams: { collection_id: laadpalendata.id },
    countryCode: params.countryCode,
  })

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-2">{model.name}</h1>
      {model?.name && <Image alt="adfasdf" src={model?.name} width={100} height={50} />}
      {model?.PictureId && <Image alt="adfasdf" src={model?.PictureId} width={100} height={50} />}
      

      <p className="text-gray-600 mb-2">
        Merk: <strong>{brand.name}</strong>
      </p>
      

    <h3 className="text-xl font-bold mb-2">Laadkabels voor {model.brand} {model.name}</h3>
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: model?.ChargingCableDescription }}
    />
          <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collection={laadkabels} region={region} />
          </ul>

    <h3 className="text-xl font-bold mb-2">Laadpalen voor {model.brand} {model.name}</h3>
<div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: model?.ChargingStationDescription }}
    />
    <ul className="flex flex-col gap-x-6">
            <FeaturedProducts collection={laadpalen} region={region} />
          </ul>

    <h3 className="text-xl font-bold mb-2">Laad accesoires voor {model.brand} {model.name}</h3>
<div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: model?.AccessoriesDescription }}
    />
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: model?.ModelBannerDescription }}
    />

    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: model?.description }}
    />
    </main>
  );
}
