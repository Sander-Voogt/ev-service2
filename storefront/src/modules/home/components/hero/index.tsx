"use client"
import { string_to_slug } from "app/[countryCode]/(main)/auto/[brand]/CarModelSearch"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { HERO_CAROUSEL_INTERVAL_MS } from "@lib/site-config"
import { ArrowRight, ChevronDown } from "lucide-react"

const Hero = ({ models }: { models: Record<string, string>[] }) => {
  const router = useRouter()
  const [selectedMake, setSelectedMake] = useState<string>(models?.[0]?.name ?? "")
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [brandmodels, setBrandModels] = useState<
    { name: string; id: string; created_at: string; carmodels: Record<string, string>[] }[]
  >([])

  const carouselImages = [
    "https://bucket-production-6ff8.up.railway.app/medusa-media/0008089.webp",
    "https://bucket-production-6ff8.up.railway.app/medusa-media/0008090.webp",
    "https://bucket-production-6ff8.up.railway.app/medusa-media/0008091.webp",
    "https://bucket-production-6ff8.up.railway.app/medusa-media/0008092.webp",
  ]

  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length)
    }, HERO_CAROUSEL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const brand = models.find((b) => b.name === selectedMake)
    if (brand) {
      setBrandModels(brand.carmodels as any)
      setSelectedModel((brand.carmodels as any)?.[0]?.name ?? "")
    }
  }, [selectedMake, models])

  return (
    <section className="relative w-full bg-[#0f1d24] overflow-hidden">
      {/* Background carousel */}
      <div className="absolute inset-0">
        {carouselImages.map((src, i) => (
          <div
            key={src}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              i === currentImage ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f1d24]/85 via-[#0f1d24]/60 to-[#0f1d24]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1d24]/70 via-transparent to-transparent" />
      </div>

      <div className="relative content-container py-16 sm:py-24 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Headline — staggered entry */}
          <div className="lg:col-span-7 text-white max-w-[680px] hero-stagger">
            <span className="eyebrow-dark mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B0CB31] mr-2 animate-pulse" />
              Specialist in laadoplossingen
            </span>
            <h1 className="display-2xl text-white">
              Laadkabels &amp; laadpalen,{" "}
              <span className="text-[#B0CB31]">precies passend</span> bij jouw auto.
            </h1>
            <p className="lede mt-5 text-white/85 max-w-[540px]">
              Selecteer je merk en model. Wij tonen je direct de juiste laadkabels en
              laadpalen — vandaag besteld, morgen in huis.
            </p>
          </div>

          {/* Picker card — gentle float + jade glow */}
          <div className="lg:col-span-5 animate-float">
            <div className="relative bg-white rounded-[16px] border border-white/10 p-6 sm:p-7 shadow-[0_24px_60px_-20px_rgba(50,173,106,0.45),0_8px_20px_-8px_rgba(0,0,0,0.35)]">
              <div className="mb-4">
                <span className="eyebrow">Vind jouw lader</span>
                <h2 className="display-sm mt-1.5 text-text-base">
                  Welke auto laadt u op?
                </h2>
              </div>

              <div className="space-y-3">
                <div>
                  <label
                    htmlFor="car-make-select"
                    className="block text-[12px] font-medium text-text-muted mb-1.5"
                  >
                    Automerk
                  </label>
                  <div className="relative">
                    <select
                      id="car-make-select"
                      className="select-base pr-9"
                      value={selectedMake}
                      onChange={(e) => setSelectedMake(e.target.value)}
                    >
                      {models.map((make, key) => (
                        <option key={key} value={make.name}>
                          {make.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="car-model-select"
                    className="block text-[12px] font-medium text-text-muted mb-1.5"
                  >
                    Model
                  </label>
                  <div className="relative">
                    <select
                      id="car-model-select"
                      className="select-base pr-9"
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                    >
                      {brandmodels.map((model: any) => (
                        <option key={model.name} value={model.name}>
                          {model.name}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-4 h-4 text-text-muted absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (!selectedMake || !selectedModel) return
                    router.push(
                      `/auto/${string_to_slug(selectedMake.toLowerCase())}/${string_to_slug(
                        selectedModel.toLowerCase()
                      )}`
                    )
                  }}
                  className="btn-primary w-full mt-3 h-12"
                >
                  Toon producten
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-5 pt-4 border-t border-border-soft flex items-center justify-between text-[12px] text-text-muted">
                <span>Niet zeker welke kabel?</span>
                <a href="/contact" className="btn-link text-[12px]">
                  Vraag gratis advies
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
