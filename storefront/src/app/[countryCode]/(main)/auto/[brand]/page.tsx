import Link from 'next/link';

// Stel dat je data van een lokale file of API haalt
import { sdk } from '@lib/config';
import { string_to_slug } from './slugger';
import Image from 'next/image';


export async function generateStaticParams() {
  const brands = await sdk.client.fetch(`/store/carbrand/models`);

  return brands.brands.map((brand) => ({
    brand: string_to_slug(brand.name.toLowerCase()),
  }));
}


export default async function BrandPage({ params }: { params: { brand: string } }) {
  const brands = await sdk.client.fetch(`/store/carbrand/models`);
  const brand = brands.brands.find(
    (b) => string_to_slug(b.name.toLowerCase()) === params.brand
  );

  if (!brand) return <div>Merk niet gevonden</div>;

  return (
    <main className="content-container">
      <h1 className="text-3xl font-bold mb-4">
        {brand.name}
        {brand.image && (
          <Image
            src={brand.image}
            alt={brand.name}
            width={80}
            height={40}
            className="rounded-md shadow mb-4"
          />
        )}
      </h1>

      {brand.description && (
        <div
          className="prose max-w-none mb-6"
          dangerouslySetInnerHTML={{ __html: brand.description }}
        />
      )}

      <ul className="grid gap-4 grid-cols-4">
        {brand.carmodels.map((model) => (
          <li key={model.id} className="p-4 border rounded-lg shadow-sm hover:shadow-md">
            <Link
              href={`/auto/${string_to_slug(brand.name.toLowerCase())}/${string_to_slug(
                model.name.toLowerCase().replace(/\s+/g, '-')
              )}`}
            >
              <div className="font-medium">{model.name}</div>
              {model.image && (
                <Image
                  src={model.image}
                  alt={model.name}
                  width={80}
                  height={40}
                  className="mt-2 w-full rounded-md"
                />
              )}
            </Link>
          </li>
        ))}
      </ul>

      {brand.BottomDescription && (
        <div
          className="prose max-w-none mt-6"
          dangerouslySetInnerHTML={{ __html: brand.BottomDescription }}
        />
      )}
    </main>
  );
}
