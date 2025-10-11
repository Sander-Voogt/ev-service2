import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import {
  getCollectionByHandle,
  getCollectionsWithProducts,
  retrieveCollection,
} from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { sdk } from "@lib/config"
import { getProductsList } from "@lib/data/products"
import Image from "next/image"
import api from "@lib/ghost"


export const metadata: Metadata = {
  title: "EV Service - Laadkabels en Laadpalen voor elektrische auto's | Laadkabel type 2 | Laadkabel Auto | Laadpaal",
  description:
    "Laadkabels & Laadpalen. Groot assortiment, alles voor je elektrische auto. Vakkundige laadpaal installatie mogelijk.",
}

type Brand = {
  name: string
  image?: string
  description?: string
}

type ApiResponse = {
  brands: Brand[]
}

export default async function Home({
  params: { countryCode },
}: {
  params: { countryCode: string }
}) {
  const collections = await getCollectionByHandle("home-page")
  const { response } = await getProductsList({
    queryParams: { collection_id: collections.id },
    countryCode,
  })
  const region = await getRegion(countryCode)

  const models: ApiResponse = await sdk.client.fetch(`/store/carbrand/models`)

  console.log(models)

  if (!collections || !region) {
    return null
  }

   const posts = await api.posts.browse({ limit: "3" })

  return (
    <>
      <Hero models={models.brands} />
      <ul className="flex flex-col gap-x-6">
        <FeaturedProducts collection={response} region={region} />
      </ul>
      <div className="content-container">
        <section className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <p>Producten & Service</p>
            <ul>
              <li>Laadkabels voor alle elektrische auto's</li>
              <li>Laadpaal zelf installeren? Wij helpen je</li>
            </ul>
          </div>

          <div className="flex-1 flex flex-col justify-center" style={{backgroundImage: 'url("/img/image.png")', height: '220px', backgroundPosition: 'center center'}}>
            <span className="bg-white text-lg mt-50 my-2 px-4 text-green-600" style={{width: 'fit-content'}}>Jouw laadpaal vakkundig geïnstalleerd</span><br />
            <span className="bg-white text-lg my-2 px-4 text-green-600"  style={{width: 'fit-content'}}>met onze installatieservice</span>
          </div>
        </section>
      </div>
      <div className="content-container flex flex-col space-y-16">
      {/* 1️⃣ Producten & Services */}
      <section className="container mx-auto px-4 mt-12">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold mb-2">Producten en Services</h3>
            <ul className="space-y-2">
              <li className="text-green-700 hover:underline cursor-pointer">
                Laadkabels voor alle elektrische auto's →
              </li>
              <li className="text-green-700 hover:underline cursor-pointer">
                Laadpaal zelf installeren? Wij helpen je →
              </li>
            </ul>
          </div>

          <div className="relative rounded-2xl overflow-hidden h-64 md:h-auto">
            <Image
              src="/img/image.png"
              alt="Installatieservice"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center p-6">
              <div className="text-white space-y-2">
                <span className="bg-green-600 text-white px-2 py-1 rounded text-sm">
                  Jouw laadpaal vakkundig geïnstalleerd
                </span>
                <h3 className="text-xl font-semibold leading-tight">
                  met onze installatieservice →
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2️⃣ Waarom EService */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-8">Waarom EService?</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: "Gemak", desc: "Je eigen laadkabel thuis of op het werk...", icon: "💡" },
            { title: "Snelle levering", desc: "Vandaag voor 22:00 besteld = morgen in huis.", icon: "🚚" },
            { title: "Betrouwbaar", desc: "Gecertificeerde montage, 2 jaar garantie.", icon: "👍" },
            { title: "Bereikbaar", desc: "Persoonlijk advies via telefoon of WhatsApp.", icon: "📞" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="border rounded-2xl text-center p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-4xl text-green-700 mb-3">{item.icon}</div>
              <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3️⃣ Onze Servicebelofte */}
      <section className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold">Onze servicebelofte</h2>
          <p className="text-gray-700">
            Onze technische specialisten bieden ondersteuning via WhatsApp, e-mail en telefoon.
          </p>
          <ul className="space-y-2 text-gray-700">
            <li>✅ Technische ondersteuning</li>
            <li>✅ Complete installatie</li>
            <li>✅ Onderhoud</li>
          </ul>
        </div>
        <div className="flex-1 relative h-72 md:h-96">
          <Image
            src="/img/zaptec-UHNdOFqNhNQ-unsplash.jpg"
            alt="Service team"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      </section>

      {/* 4️⃣ Blogs */}
      <section className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Blogs</h2>
          <button className="border border-green-700 text-green-700 px-4 py-2 rounded-lg hover:bg-green-50">
            Meer Blogs
          </button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((i) => (
            <div key={i.id} className="border rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
              <Image
                src={i.feature_image ?? 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png'}
                alt="Blog afbeelding"
                width={400}
                height={200}
                className="object-cover w-full h-48"
              />
              <div className="p-4 space-y-2">
                <h4 className="font-semibold text-base">{i.title}</h4>
                <p className="text-sm text-gray-600">{i.excerpt}</p>
                <a href={`/blog/${i.slug}`} className="text-green-700 text-sm font-medium hover:underline">
                  Lees meer →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5️⃣ Reviews */}
      <section className="container mx-auto px-4 text-center space-y-8">
        <h3 className="text-xl font-semibold">
          Onze klanten waarderen ons met een{" "}
          <span className="text-green-700 font-bold">9.0</span>
        </h3>
        <p className="text-gray-600">Op basis van 595 onafhankelijke reviews op Kiyoh</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Hubertus Heijlenis", score: "9/10", text: "Prompt geleverd, alles perfect in orde." },
            { name: "Jenny", score: "9/10", text: "Snelle oplossing, goede service." },
            { name: "Chanyanut", score: "8/10", text: "Alles in orde, duidelijke communicatie." },
          ].map((r, idx) => (
            <div key={idx} className="border rounded-2xl p-6 hover:shadow-md transition-shadow text-left">
              <p className="text-green-700 font-bold">{r.score}</p>
              <p className="text-gray-700 text-sm mb-2">{r.text}</p>
              <p className="text-gray-500 text-xs">{r.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
    </>
  )
}
