"use client";
import { Button } from "@medusajs/ui"
import { string_to_slug } from "app/[countryCode]/(main)/auto/[brand]/CarModelSearch";
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { HERO_CAROUSEL_INTERVAL_MS } from "@lib/site-config"

const carMakes = ["Abarth", "Audi", "BMW", "Tesla"] as const;
type CarMake = typeof carMakes[number];

const Hero = ({models}: {models: Record<string, string>[]}) => {
  const router = useRouter()
  const [selectedMake, setSelectedMake] = useState<CarMake>(carMakes[0]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [brandmodels, setBrandModels] = useState<{
    name: string,
    id: string,
    created_at: string,
    carmodels: Record<string,string>[]
  }[]>([]);

  const carouselImages = [
    "https://bucket-production-6ff8.up.railway.app/medusa-media/0008089.webp",
    "https://bucket-production-6ff8.up.railway.app/medusa-media/0008090.webp",
    "https://bucket-production-6ff8.up.railway.app/medusa-media/0008091.webp",
    "https://bucket-production-6ff8.up.railway.app/medusa-media/0008092.webp"
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % carouselImages.length);
        setIsTransitioning(false);
      }, 500);
    }, HERO_CAROUSEL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const brand_models = models.find(brand => brand.name === selectedMake)
    setBrandModels(brand_models.carmodels);
    setSelectedModel(brand_models?.carmodels?.[0]?.name);
  }, [selectedMake])

  return (
    <div className="relative h-[85vh] min-h-[700px] w-full flex items-center justify-center overflow-hidden">
      {/* Background image with sophisticated overlay */}
      <div className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ${isTransitioning ? 'scale-105' : 'scale-100'}`}
           style={{
             backgroundImage: `url(${carouselImages[currentImage]})`,
           }}
      />

      {/* Premium gradient overlay with depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/85 via-emerald-800/75 to-green-900/85 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40" />

        {/* Animated particle effects */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-64 h-64 bg-green-400 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-300 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 right-32 w-32 h-32 border-2 border-white/20 rounded-xl rotate-45 animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute bottom-40 left-40 w-24 h-24 border-2 border-white/20 rounded-full animate-[float_8s_ease-in-out_infinite_reverse]" />
        <div className="absolute top-1/3 left-1/4 w-16 h-16 bg-gradient-to-br from-green-400/30 to-emerald-400/30 rounded-lg rotate-12 animate-[float_7s_ease-in-out_infinite]" />
      </div>

      {/* Main content with sophisticated layout */}
      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between w-full max-w-screen-2xl mx-auto px-6 py-16 gap-12">

        {/* Left: Premium animated graphic */}
        <div className="hidden lg:flex flex-col items-center justify-center relative">
          <div className="relative group">
            {/* Main circle with glassmorphism */}
            <div className="w-72 h-72 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-500/20 backdrop-blur-xl flex items-center justify-center shadow-2xl border border-white/30 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-300/30 to-emerald-400/30 animate-[spin_20s_linear_infinite]" />

              <div className="w-56 h-56 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-xl relative z-10 group-hover:scale-105 transition-transform duration-500">
                <div className="w-44 h-44 rounded-full bg-gradient-to-br from-green-300 to-green-400 flex items-center justify-center shadow-inner">
                  <svg width="80" height="80" viewBox="0 0 40 40" fill="none" className="drop-shadow-2xl">
                    <rect x="8" y="13" width="25" height="15" rx="4" fill="#E6FCE5" stroke="#22C55E" strokeWidth="2"/>
                    <rect x="34" y="18" width="2.5" height="5" rx="1.25" fill="#22C55E"/>
                    <path d="M20 16l-3.75 6.25h2.5v3.75l3.75-6.25h-2.5V16z" fill="#2DD4BF"/>
                  </svg>
                </div>
              </div>

              {/* Animated rings */}
              <div className="absolute inset-0 rounded-full border-4 border-white/20 animate-[spin_15s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border-3 border-white/15 animate-[spin_20s_linear_infinite_reverse]" />
              <div className="absolute inset-8 rounded-full border-2 border-white/10 animate-[spin_25s_linear_infinite]" />
            </div>

            {/* Floating stats */}
            <div className="absolute -top-8 -right-8 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-[float_4s_ease-in-out_infinite]">
              <div className="text-3xl font-bold text-green-700">10k+</div>
              <div className="text-xs text-gray-600">Happy Customers</div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl animate-[float_5s_ease-in-out_infinite_reverse]">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </div>
                <div className="text-sm font-semibold text-gray-900">9.0</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Premium glassmorphism form */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl p-10 flex flex-col gap-6 min-w-[400px] max-w-[450px] border border-white/50 relative overflow-hidden group">
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-emerald-50 opacity-50" />
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-400/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl" />

          {/* Content */}
          <div className="relative z-10">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
                Find Your Charger
              </h2>
              <p className="text-gray-600">Select your car brand and model</p>
            </div>

            <div className="space-y-5">
              <div className="relative group/select">
                <label htmlFor="car-make-select" className="block text-sm font-semibold text-gray-700 mb-2">Car Brand</label>
                <select
                  id="car-make-select"
                  className="appearance-none w-full rounded-2xl border-2 border-gray-200 bg-white px-6 py-4 pr-12 text-gray-900 shadow-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all hover:border-green-300 cursor-pointer font-semibold text-lg group-hover/select:border-green-400"
                  value={selectedMake}
                  onChange={e => {
                    const make = e.target.value as CarMake
                    setSelectedMake(make)
                  }}
                >
                  {models.map((make, key) => (
                    <option key={key} value={make.name}>
                      {make.name}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-green-600 top-8">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>

              <div className="relative group/select">
                <label htmlFor="car-model-select" className="block text-sm font-semibold text-gray-700 mb-2">Car Model</label>
                <select
                  id="car-model-select"
                  className="appearance-none w-full rounded-2xl border-2 border-gray-200 bg-white px-6 py-4 pr-12 text-gray-900 shadow-lg focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all hover:border-green-300 cursor-pointer font-semibold text-lg group-hover/select:border-green-400"
                  value={selectedModel}
                  onChange={e => setSelectedModel(e.target.value)}
                >
                  {brandmodels.map((model: string) => (
                    <option key={model.name} value={model.name}>
                      {model.name}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-green-600 top-8">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-green-600 to-emerald-700 text-white font-bold rounded-2xl py-5 hover:from-green-700 hover:to-emerald-800 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 text-lg group-hover:scale-105"
                variant="secondary"
                onClick={() => {
                  router.push(`/auto/${string_to_slug(selectedMake.toLowerCase())}/${string_to_slug(selectedModel.toLowerCase())}`);
                }}
              >
                <span className="flex items-center justify-center gap-3">
                  Show Products
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Button>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-6 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span className="font-medium">2 Year Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Enhanced headline section */}
        <div className="flex flex-col items-start justify-center max-w-lg space-y-8">
          <div className="space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full shadow-lg border border-white/50 hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-gray-900">Now with free installation</span>
            </div>

            {/* Main headline */}
            <div>
              <h1 className="text-6xl lg:text-7xl font-black text-white leading-tight mb-4" style={{textShadow: '0 4px 30px rgba(0,0,0,0.3)'}}>
                EV Charging
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 to-emerald-200">
                  Solutions
                </span>
              </h1>
              <p className="text-xl text-white/90 leading-relaxed font-light">
                Premium charging solutions tailored to your vehicle. Quality guaranteed, service unmatched.
              </p>
            </div>

            {/* Premium features */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: "⚡", text: "Fast Delivery" },
                { icon: "🛡️", text: "2 Year Warranty" },
                { icon: "🎯", text: "Perfect Fit" },
                { icon: "💬", text: "24/7 Support" }
              ].map((feature, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl group-hover:scale-110 transition-transform">{feature.icon}</span>
                    <span className="text-white font-medium">{feature.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center pt-2">
          <div className="w-2 h-2 bg-white/70 rounded-full animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default Hero;