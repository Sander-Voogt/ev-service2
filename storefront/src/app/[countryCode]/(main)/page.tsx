import { Metadata } from "next"

import FeaturedProducts from "@modules/home/components/featured-products"
import Hero from "@modules/home/components/hero"
import { getCollectionByHandle } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { sdk } from "@lib/config"
import { getProductsList } from "@lib/data/products"
import Image from "next/image"
import Link from "next/link"
import api from "@lib/ghost"
import Reveal from "@modules/common/components/reveal"
import {
  Truck,
  ShieldCheck,
  Headphones,
  Wrench,
  ArrowRight,
  Star,
  CircleCheck,
  Cable,
  Plug,
  Building2,
} from "lucide-react"

export const metadata: Metadata = {
  title:
    "EV Service - Laadkabels en Laadpalen voor elektrische auto's | Laadkabel type 2 | Laadkabel Auto | Laadpaal",
  description:
    "Laadkabels & Laadpalen. Groot assortiment, alles voor je elektrische auto. Vakkundige laadpaal installatie mogelijk.",
}

type Brand = { name: string; image?: string; description?: string }
type ApiResponse = { brands: Brand[] }

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

  if (!collections || !region) return null

  const posts = await api.posts.browse({ limit: "3" })

  const usps = [
    {
      icon: Truck,
      title: "Snelle levering",
      desc: "Voor 22:00 besteld, morgen geleverd in NL & BE.",
    },
    {
      icon: ShieldCheck,
      title: "2 jaar garantie",
      desc: "Op alle laadkabels, laadpalen en accessoires.",
    },
    {
      icon: Wrench,
      title: "Installatie service",
      desc: "Vakkundige montage door erkende installateurs.",
    },
    {
      icon: Headphones,
      title: "Persoonlijk advies",
      desc: "Bel, mail of WhatsApp — wij denken met je mee.",
    },
  ]

  const productLinks = [
    {
      icon: Cable,
      title: "Laadkabels per merk",
      desc: "Voor élke EV — direct het juiste model.",
      href: "/auto",
    },
    {
      icon: Plug,
      title: "Laadpalen voor thuis",
      desc: "Slim laden in je eigen oprit.",
      href: "/categories/laadpalen",
    },
    {
      icon: Wrench,
      title: "Installatie service",
      desc: "Erkende installateurs door heel NL & BE.",
      href: "/installatie-service",
    },
    {
      icon: Building2,
      title: "Zakelijk laden",
      desc: "Oplossingen voor bedrijf, vloot en VvE.",
      href: "/zakelijk",
    },
  ]

  const promiseBullets = [
    "Technische ondersteuning per WhatsApp, telefoon en e-mail",
    "Complete installatie door erkende monteurs",
    "Onderhoud en service na plaatsing",
    "2 jaar garantie op alle producten",
  ]

  const features = [
    {
      icon: CircleCheck,
      title: "Slim assortiment",
      desc: "500+ producten, geselecteerd op kwaliteit en compatibiliteit.",
    },
    {
      icon: Truck,
      title: "Snel in huis",
      desc: "Voor 22:00 besteld op werkdagen, morgen geleverd.",
    },
    {
      icon: ShieldCheck,
      title: "Zekerheid",
      desc: "2 jaar garantie en duidelijke retourvoorwaarden.",
    },
    {
      icon: Headphones,
      title: "Echte mensen",
      desc: "Persoonlijk advies via telefoon, e-mail of WhatsApp.",
    },
  ]

  const reviews = [
    {
      name: "Hubertus",
      score: "9/10",
      text: "Prompt geleverd, alles perfect in orde.",
    },
    {
      name: "Jenny",
      score: "9/10",
      text: "Snelle oplossing, goede service.",
    },
    {
      name: "Chanyanut",
      score: "8/10",
      text: "Alles in orde, duidelijke communicatie.",
    },
  ]

  return (
    <>
      <Hero models={models.brands} />

      {/* USP strip — soft band that bridges hero to content */}
      <section className="bg-page-soft border-b border-border-soft">
        <div className="content-container py-6">
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-5 lg:divide-x lg:divide-border-soft">
            {usps.map((u, i) => (
              <Reveal
                key={u.title}
                as="li"
                variant="up"
                delay={i * 80}
                className={`flex items-start gap-3 ${i > 0 ? "lg:pl-8" : ""}`}
              >
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-jade/10 text-jade flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:bg-jade hover:text-white">
                  <u.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-semibold text-text-base">
                    {u.title}
                  </p>
                  <p className="text-[12.5px] text-text-muted leading-snug mt-0.5">
                    {u.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Featured products — white */}
      <FeaturedProducts collection={response} region={region} />

      {/* Producten & Service duo — tinted band */}
      <section className="bg-page-tinted">
        <div className="content-container section-pad">
          <div className="grid lg:grid-cols-12 gap-6">
            {/* Left: link rows */}
            <Reveal variant="left" className="lg:col-span-7 surface-feature p-7 sm:p-9">
              <span className="eyebrow">Producten &amp; Service</span>
              <h2 className="display-lg mt-2 text-text-base">
                Vind precies wat je zoekt — voor élke EV.
              </h2>
              <p className="lede mt-3 max-w-[520px]">
                Kies je startpunt. Wij brengen je naar de juiste laadkabel,
                laadpaal of installatieoptie.
              </p>

              <ul className="mt-6 divide-y divide-border-soft border-t border-border-soft">
                {productLinks.map((p, i) => (
                  <li key={p.title}>
                    <Link
                      href={p.href}
                      className="group flex items-center gap-4 py-4 px-1 -mx-1 rounded-md hover:bg-page-soft hover:px-3 transition-all duration-300"
                    >
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-jade/10 text-jade flex items-center justify-center transition-all duration-300 group-hover:bg-jade group-hover:text-white group-hover:scale-110">
                        <p.icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-[14.5px] font-semibold text-text-base group-hover:text-jade transition-colors">
                          {p.title}
                        </p>
                        <p className="text-[13px] text-text-muted mt-0.5">
                          {p.desc}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#8a9aa3] group-hover:text-jade group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Right: image card */}
            <Reveal variant="right" delay={120} className="lg:col-span-5 relative rounded-[16px] overflow-hidden border border-border-soft min-h-[360px] group">
              <Image
                src="/img/image.png"
                alt="Installatieservice"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f1d24]/85 via-[#0f1d24]/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="eyebrow-dark">Premium service</span>
                <p className="display-sm mt-1.5 text-white max-w-[260px]">
                  Jouw laadpaal vakkundig geïnstalleerd.
                </p>
                <Link
                  href="/installatie-service"
                  className="btn-primary mt-4 shine-on-hover"
                >
                  Vraag installatie aan
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Waarom EV Service — page bg */}
      <section className="bg-page">
        <div className="content-container section-pad">
          <Reveal variant="up" className="section-header text-center mx-auto items-center max-w-[640px]">
            <span className="eyebrow">Waarom EV Service</span>
            <h2 className="display-lg">
              Specialisten in laadoplossingen.
            </h2>
            <p className="lede mt-1">
              We selecteren elk product op kwaliteit en compatibiliteit. En als
              er iets is, helpen echte mensen je verder.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((item, i) => (
              <Reveal
                key={item.title}
                variant="up"
                delay={i * 100}
                className="surface-card-bar surface-card-hover p-6 pt-7 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex w-11 h-11 rounded-[12px] bg-jade/10 text-jade items-center justify-center transition-all duration-300 group-hover:bg-jade group-hover:text-white group-hover:scale-110 group-hover:rotate-[-6deg]">
                    <item.icon className="w-5 h-5" strokeWidth={2} />
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.18em] text-text-subtle">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="text-[15.5px] font-semibold text-text-base leading-tight">
                  {item.title}
                </h3>
                <p className="text-[13.5px] text-text-muted leading-relaxed mt-2">
                  {item.desc}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Onze servicebelofte — soft band, image-right */}
      <section className="bg-page-soft border-y border-border-soft">
        <div className="content-container section-pad">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <Reveal variant="left" className="lg:col-span-6 order-2 lg:order-1">
              <span className="eyebrow">Onze belofte</span>
              <h2 className="display-lg mt-2 text-text-base">
                Van advies tot installatie — alles uit één hand.
              </h2>
              <p className="lede mt-4 max-w-[520px]">
                Onze technische specialisten denken met je mee, voor en na de
                aankoop. Of het nu om een kabel of een complete laadpaal-
                installatie gaat.
              </p>

              <ul className="mt-6 space-y-3">
                {promiseBullets.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CircleCheck
                      className="w-[18px] h-[18px] text-jade flex-shrink-0 mt-0.5"
                      strokeWidth={2}
                    />
                    <span className="text-[14px] text-text-base leading-relaxed">
                      {t}
                    </span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/installatie-service" className="btn-primary shine-on-hover">
                  Installatie aanvragen
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Vraag advies
                </Link>
              </div>
            </Reveal>

            <Reveal variant="right" delay={120} className="lg:col-span-6 order-1 lg:order-2 relative rounded-[16px] overflow-hidden border border-border-soft aspect-[4/3] group">
              <Image
                src="/img/zaptec-UHNdOFqNhNQ-unsplash.jpg"
                alt="Service team"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Blog — tinted band */}
      {posts && posts.length > 0 && (
        <section className="bg-page-tinted">
          <div className="content-container section-pad">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="eyebrow">Kennisbank</span>
                <h2 className="display-lg mt-2">Lees meer over laden.</h2>
              </div>
              <Link href="/blog" className="btn-link hidden sm:inline-flex">
                Alle artikelen
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {posts.map((p, i) => (
                <Reveal
                  key={p.id}
                  variant="up"
                  delay={i * 120}
                  as="div"
                >
                <Link
                  href={`/blog/${p.slug}`}
                  className="group surface-card surface-card-hover overflow-hidden block"
                >
                  <div className="relative aspect-[16/10] bg-page-soft overflow-hidden">
                    <Image
                      src={
                        p.feature_image ??
                        "https://medusa-public-images.s3.eu-west-1.amazonaws.com/sweatpants-gray-front.png"
                      }
                      alt={p.title ?? ""}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[#8a9aa3]">
                      Artikel
                    </span>
                    <h3 className="text-[15px] font-semibold text-text-base leading-snug group-hover:text-jade transition-colors line-clamp-2 mt-1.5">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="text-[13.5px] text-text-muted mt-2 line-clamp-2 leading-relaxed">
                        {p.excerpt}
                      </p>
                    )}
                    <span className="btn-link text-[12.5px] mt-4 group-hover:gap-2.5 transition-all">
                      Lees artikel
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </div>
                </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews — soft band with dark mini-card anchor */}
      <section className="bg-page-soft border-t border-border-soft">
        <div className="content-container section-pad">
          <div className="grid lg:grid-cols-12 gap-6 items-stretch">
            {/* Score panel — dark accent card */}
            <Reveal variant="left" className="lg:col-span-5">
              <div className="h-full rounded-[20px] bg-[#0f1d24] text-white p-7 sm:p-9 flex flex-col">
                <span className="eyebrow-dark">Reviews</span>
                <h2 className="display-lg mt-2.5 text-white">
                  Beoordeeld met een{" "}
                  <span className="text-[#B0CB31]">9.0 / 10</span>
                </h2>
                <p className="lede mt-3 text-white/70 max-w-[360px]">
                  Op basis van 595 onafhankelijke reviews op Kiyoh.
                </p>
                <div className="flex items-center gap-1 mt-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-[18px] h-[18px] text-[#B0CB31] fill-[#B0CB31]"
                    />
                  ))}
                  <span className="ml-2.5 text-[13px] text-white/80">
                    595 reviews
                  </span>
                </div>
                <div className="mt-auto pt-7">
                  <a
                    href="https://www.kiyoh.com"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-link-dark text-[13px]"
                  >
                    Lees alle reviews op Kiyoh
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Review cards */}
            <div className="lg:col-span-7 grid sm:grid-cols-3 gap-4">
              {reviews.map((r, i) => (
                <Reveal
                  key={r.name}
                  variant="up"
                  delay={i * 100 + 200}
                  className="surface-card-accent p-5 pl-6 flex flex-col surface-card-hover"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5 text-jade fill-jade"
                        />
                      ))}
                    </div>
                    <span className="pill-success">{r.score}</span>
                  </div>
                  <p className="text-[14px] text-text-base leading-relaxed flex-1">
                    “{r.text}”
                  </p>
                  <p className="text-[11px] text-[#8a9aa3] mt-4 uppercase tracking-[0.12em] font-semibold">
                    — {r.name}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
