"use client";
import { Button } from "@medusajs/ui"
import { string_to_slug } from "app/[countryCode]/(main)/auto/[brand]/CarModelSearch";
import { useState, useEffect } from "react"

const carMakes = ["Abarth", "Audi", "BMW", "Tesla"] as const;
type CarMake = typeof carMakes[number];


const Hero = ({models}: {models: Record<string, string>[]}) => {
  const [selectedMake, setSelectedMake] = useState<CarMake>(carMakes[0]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [brandmodels, setBrandModels] = useState<{
    name: string,
    id: string,
    created_at: string,
    carmodels: Record<string,string>[]
  }[]>([]);

  console.log(models);

  const carouselImages = [
    "https://bucket-production-6ff8.up.railway.app/medusa-media/0008089.webp",
    "https://bucket-production-6ff8.up.railway.app/medusa-media/0008090.webp",
    "https://bucket-production-6ff8.up.railway.app/medusa-media/0008091.webp",
    "https://bucket-production-6ff8.up.railway.app/medusa-media/0008092.webp"
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const brand_models = models.find(brand => brand.name === selectedMake)
    setBrandModels(brand_models.carmodels);
    setSelectedModel(brand_models?.carmodels?.[0]?.name);

  }, [selectedMake])

  console.log('ddddd', process.env.NEXT_PUBLIC_BASE_URL+carouselImages[0])
  return (
    <div className="relative h-[50vh] w-full flex items-center justify-center overflow-hidden">
  {/* Background image */}
  <div
    className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700"
    style={{
      backgroundImage: `url(${carouselImages[currentImage]})`,
    }}
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-black/70 to-green-900/70 z-0" />

  {/* Content wrapper */}
  <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full max-w-screen-xl px-6">
    
    {/* Left: Graphic */}
    <div className="hidden md:flex flex-col items-center justify-center mr-12">
      <div className="w-44 h-44 rounded-full bg-green-100 flex items-center justify-center shadow-md">
        <div className="w-28 h-28 rounded-full bg-green-500 flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <rect x="8" y="13" width="25" height="15" rx="4" fill="#E6FCE5" stroke="#22C55E" strokeWidth="2"/>
            <rect x="34" y="18" width="2.5" height="5" rx="1.25" fill="#22C55E"/>
            <path d="M20 16l-3.75 6.25h2.5v3.75l3.75-6.25h-2.5V16z" fill="#2DD4BF"/>
          </svg>
        </div>
      </div>
    </div>

    {/* Center: Form */}
    <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col gap-4 min-w-[320px] mt-[25%] md:mt-0 max-w-[360px] border border-green-100">
      <h2 className="text-xl font-semibold text-green-900 mb-2 text-center">
      Vind de laadpaal voor jouw auto
      </h2>
      <div className="relative">
      <select
        className="appearance-none w-full rounded-full border border-green-200 bg-white px-4 py-2 pr-10 text-green-900 shadow-sm focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
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
      {/* Custom dropdown icon */}
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-green-500">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
      </div>

      <div className="relative mt-3">
      <select
        className="appearance-none w-full rounded-full border border-green-200 bg-white px-4 py-2 pr-10 text-green-900 shadow-sm focus:border-green-400 focus:ring-2 focus:ring-green-400 transition"
        value={selectedModel}
        onChange={e => setSelectedModel(e.target.value)}
      >
        {brandmodels.map((model: string) => (
        <option key={model.name} value={model.name}>
          {model.name}
        </option>
        ))}
      </select>
      {/* Custom dropdown icon */}
      <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-green-500">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" />
        </svg>
      </span>
      </div>

      <Button
      className="w-full bg-green-600 text-white font-semibold rounded-lg py-2 hover:bg-green-700 transition-colors"
      variant="secondary"
      onClick={() => {
        window.location.href = `/auto/${string_to_slug(selectedMake.toLowerCase())}/${string_to_slug(selectedModel.toLowerCase())}`;
      }}
      >
      Toon producten
      </Button>
    </div>

    {/* Right: Headline */}
    <div className="flex flex-col items-start justify-center mt-10 md:mt-0 md:ml-12">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight drop-shadow">
        Laadpalen
      </h1>
      <p className="text-green-100 text-lg max-w-md">
        Reliable charging solutions tailored to your vehicle brand and model.
      </p>
    </div>
  </div>
</div>

  );
};

export default Hero;