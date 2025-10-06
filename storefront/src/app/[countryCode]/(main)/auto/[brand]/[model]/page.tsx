import { sdk } from "@lib/config"
import { string_to_slug } from "../slugger"

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

  console.log('✅ Generated model params:', params.slice(0, 5));
  return params;
}

export default async function ModelPage({
  params,
}: {
  params: { brand: string; model: string }
}) {
  const response = await sdk.client.fetch(`/store/carbrand/models`);
  const brands = response.brands ?? response.data ?? [];

  const brand = brands.find(
    (b) => string_to_slug(b.name) === params.brand
  );

  const model = brand?.carmodels.find(
    (m) => string_to_slug(m.name) === params.model
  );

  if (!brand || !model) {
    console.log('❌ Niet gevonden:', { brandParam: params.brand, modelParam: params.model });
    return <div>Model niet gevonden</div>;
  }
  
  console.log(model)

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-2">{model.name}</h1>
      <img
        src={model.image}
        alt={model.name}
        className="rounded-xl shadow mb-4 w-96"
      />
      <p className="text-gray-600 mb-2">
        Merk: <strong>{brand.name}</strong>
      </p>
      

    <h3 className="text-xl font-bold mb-2">Laadkabels voor {model.brand} {model.name}</h3>
    <div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: model?.ChargingCableDescription }}
    />

    <h3 className="text-xl font-bold mb-2">Laadpalen voor {model.brand} {model.name}</h3>
<div
      className="prose max-w-none"
      dangerouslySetInnerHTML={{ __html: model?.ChargingStationDescription }}
    />
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
