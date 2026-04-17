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
import { Lightbulb, Truck, ThumbsUp, Phone, Zap, Shield, Award } from "lucide-react"


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

      <div className="relative">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/50 via-white to-green-50/30" />

        <div className="relative content-container flex flex-col space-y-32 py-20">

          {/* 1️⃣ Premium Products & Services */}
          <section className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Enhanced services card */}
              <div className="group relative bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl hover:shadow-3xl border border-green-100 overflow-hidden transition-all duration-500 hover:-translate-y-2">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-400/20 rounded-full blur-3xl group-hover:bg-green-400/30 transition-all duration-500" />
                  <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl group-hover:bg-emerald-400/30 transition-all duration-500" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-3xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Products & Services
                      </h3>
                    </div>
                  </div>

                  <ul className="space-y-4">
                    {[
                      { text: "Laadkabels voor alle elektrische auto's", icon: "⚡" },
                      { text: "Laadpaal zelf installeren? Wij helpen je", icon: "🔧" },
                      { text: "Professionele installatieservice", icon: "👷" },
                      { text: "Gratis advies op maat", icon: "💬" }
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center gap-4 group/item">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center text-xl group-hover/item:scale-110 group-hover/item:from-green-200 group-hover/item:to-emerald-200 transition-all duration-300">
                          {item.icon}
                        </div>
                        <span className="flex-1 text-lg font-semibold text-gray-900 group-hover/item:text-green-700 group-hover/item:translate-x-2 transition-all duration-300">
                          {item.text}
                          <svg className="w-5 h-5 inline-block ml-2 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Enhanced image card */}
              <div className="relative group rounded-[2.5rem] overflow-hidden h-[500px] shadow-3xl hover:shadow-4xl transition-all duration-500 hover:-translate-y-2">
                <Image
                  src="/img/image.png"
                  alt="Installatieservice"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-10">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full border border-white/30">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="font-bold">Premium Service</span>
                    </div>
                    <h3 className="text-4xl font-black text-white leading-tight">
                      Jouw laadpaal vakkundig geïnstalleerd
                    </h3>
                    <p className="text-xl text-white/90">
                      met onze installatieservice
                    </p>
                    <button className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2️⃣ Premium Features Grid */}
          <section className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-5xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Why Choose Us
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover what makes us the preferred choice for EV charging solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "Smart Solutions",
                  desc: "Intelligent charging systems for modern needs",
                  icon: <Lightbulb className="w-8 h-8" />,
                  color: "from-amber-500 to-orange-600",
                  stats: "500+"
                },
                {
                  title: "Express Delivery",
                  desc: "Order before 22:00, delivered tomorrow",
                  icon: <Truck className="w-8 h-8" />,
                  color: "from-blue-500 to-indigo-600",
                  stats: "24h"
                },
                {
                  title: "Certified Quality",
                  desc: "Professional installation, 2-year warranty",
                  icon: <Shield className="w-8 h-8" />,
                  color: "from-green-500 to-emerald-600",
                  stats: "100%"
                },
                {
                  title: "Expert Support",
                  desc: "Personal advice via phone and WhatsApp",
                  icon: <Phone className="w-8 h-8" />,
                  color: "from-purple-500 to-pink-600",
                  stats: "24/7"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white rounded-[2rem] p-8 shadow-xl hover:shadow-3xl border border-gray-100 transition-all duration-500 hover:-translate-y-3 overflow-hidden"
                >
                  {/* Animated gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                  <div className="relative z-10">
                    {/* Icon container */}
                    <div className={`w-20 h-20 bg-gradient-to-br ${item.color} rounded-3xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {item.icon}
                    </div>

                    {/* Stats badge */}
                    <div className="absolute top-6 right-6 bg-gray-100 rounded-full px-3 py-1 text-xs font-black text-gray-900">
                      {item.stats}
                    </div>

                    <h4 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-600 transition-all duration-300">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {item.desc}
                    </p>

                    {/* Learn more link */}
                    <a href="#" className="inline-flex items-center gap-2 text-gray-900 font-bold group/link hover:text-green-700 transition-colors">
                      <span>Learn more</span>
                      <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 3️⃣ Premium Service Promise */}
          <section className="container mx-auto px-4">
            <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-[3rem] p-12 lg:p-16 shadow-3xl overflow-hidden">
              {/* Animated background elements */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-8">
                  <div>
                    <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20 mb-6">
                      <Award className="w-5 h-5 text-green-400" />
                      <span className="text-white font-bold">Our Promise</span>
                    </div>
                    <h2 className="text-5xl font-black text-white leading-tight mb-6">
                      Premium Service Guaranteed
                    </h2>
                    <p className="text-xl text-gray-300 leading-relaxed">
                      Our technical specialists provide support via WhatsApp, email, and phone. Your satisfaction is our commitment.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { title: "Technical Support", icon: "🔧" },
                      { title: "Full Installation", icon: "⚡" },
                      { title: "Maintenance", icon: "🛠️" }
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-3xl group-hover:scale-110 transition-transform">{item.icon}</span>
                          <h4 className="text-lg font-bold text-white">{item.title}</h4>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 relative h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl blur-3xl" />
                  <Image
                    src="/img/zaptec-UHNdOFqNhNQ-unsplash.jpg"
                    alt="Service team"
                    fill
                    className="object-cover rounded-3xl shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 4️⃣ Premium Blog Section */}
          <section className="container mx-auto px-4">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
                  Latest Insights
                </h2>
                <p className="text-xl text-gray-600">
                  Stay updated with the latest EV news and tips
                </p>
              </div>
              <button className="hidden md:flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-700 text-white px-8 py-4 rounded-2xl font-bold hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                <span>View All Articles</span>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((i) => (
                <article key={i.id} className="group relative bg-white rounded-[2rem] overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-500 hover:-translate-y-2 border border-gray-100">
                  {/* Image container */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={i.feature_image ?? 'https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png'}
                      alt="Blog afbeelding"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-xs font-black shadow-lg">
                      NEW
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-4">
                    <h4 className="text-2xl font-black text-gray-900 group-hover:text-green-700 transition-colors duration-300 leading-tight">
                      {i.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed line-clamp-3">
                      {i.excerpt}
                    </p>
                    <a href={`/blog/${i.slug}`} className="inline-flex items-center gap-2 text-green-700 font-black group/link hover:text-green-800 transition-colors">
                      <span>Read Article</span>
                      <svg className="w-5 h-5 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>

                  {/* Decorative corner */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-green-500/20 to-transparent rounded-tr-[2rem]" />
                </article>
              ))}
            </div>
          </section>

          {/* 5️⃣ Premium Reviews Section */}
          <section className="container mx-auto px-4 pb-16">
            <div className="relative bg-gradient-to-br from-green-600 via-emerald-700 to-green-800 rounded-[3rem] p-12 lg:p-16 shadow-3xl overflow-hidden">
              {/* Animated background */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
              </div>

              <div className="relative z-10 text-center space-y-12">
                <div className="space-y-6">
                  <div className="inline-flex items-center justify-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      ))}
                    </div>
                    <span className="text-white font-black text-lg">595 Reviews</span>
                  </div>

                  <h3 className="text-5xl lg:text-6xl font-black text-white leading-tight">
                    Rated{" "}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-200">
                      9.0/10
                    </span>
                  </h3>
                  <p className="text-xl text-green-100">
                    Based on 595 independent reviews on Kiyoh
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mt-16">
                  {[
                    { name: "Hubertus Heijlenis", score: "9/10", text: "Prompt geleverd, alles perfect in orde. Excellent service!" },
                    { name: "Jenny", score: "9/10", text: "Snelle oplossing, goede service. Highly recommend!" },
                    { name: "Chanyanut", score: "8/10", text: "Alles in orde, duidelijke communicatie. Great experience!" }
                  ].map((r, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 text-left hover:bg-white/20 transition-all duration-300 group">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                          ))}
                        </div>
                        <span className="font-black text-white text-lg">{r.score}</span>
                      </div>
                      <p className="text-white/90 text-base mb-4 leading-relaxed">{r.text}</p>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-black">
                          {r.name.charAt(0)}
                        </div>
                        <p className="text-green-200 font-bold text-sm">{r.name}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}