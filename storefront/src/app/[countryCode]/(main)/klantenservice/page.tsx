import { getHelpdeskCategories } from "@lib/ghost"
import Link from "next/link"
import Image from "next/image"
import {
  Truck,
  RefreshCcw,
  Wrench,
  ShieldCheck,
  ArrowRight,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react"

export default async function HelpdeskIndexPage() {
  const categories = await getHelpdeskCategories()

  const quicklinks = [
    {
      icon: Truck,
      label: "Waar is mijn pakket?",
      href: "/klantenservice/bezorgen",
    },
    {
      icon: RefreshCcw,
      label: "Status van mijn retour",
      href: "/returnrequest/history",
    },
    {
      icon: RefreshCcw,
      label: "Iets retourneren",
      href: "/klantenservice/retour-instructies",
    },
    {
      icon: Wrench,
      label: "Technische vraag",
      href: "/klantenservice/ondersteuning",
    },
    {
      icon: ShieldCheck,
      label: "Garantie & reparatie",
      href: "/klantenservice/garantie-reparatie",
    },
  ]

  return (
    <div className="bg-white">
      <div className="content-container py-6 sm:py-10">
        <header className="mb-8 max-w-[640px]">
          <span className="eyebrow">Klantenservice</span>
          <h1 className="display-lg mt-1 text-text-base">
            Hoe kunnen we je helpen?
          </h1>
          <p className="lede mt-2.5">
            Vind snel een antwoord, of neem direct contact met ons op.
          </p>
        </header>

        {/* Quicklinks */}
        <section className="mb-10">
          <p className="eyebrow-muted mb-3">Veelgestelde vragen</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {quicklinks.map((q) => (
              <Link
                key={q.label}
                href={q.href}
                className="group surface-card p-4 hover:border-jade/40 hover:shadow-sm transition-all"
              >
                <span className="inline-flex w-8 h-8 rounded-md bg-jade/10 text-jade items-center justify-center mb-2.5">
                  <q.icon className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <p className="text-[13px] font-medium text-text-base leading-snug group-hover:text-jade">
                  {q.label}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Categories */}
        {categories.length > 0 && (
          <section className="mb-10">
            <p className="eyebrow-muted mb-3">Onderwerpen</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/klantenservice/${category.slug}`}
                  className="group surface-card p-4 flex items-center gap-3 hover:border-jade/40 hover:shadow-sm transition-all"
                >
                  {(category as any).feature_image ? (
                    <div className="w-10 h-10 rounded-md overflow-hidden bg-page-soft flex-shrink-0 flex items-center justify-center">
                      <Image
                        src={(category as any).feature_image}
                        alt=""
                        width={28}
                        height={28}
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <span className="w-10 h-10 rounded-md bg-jade/10 text-jade flex items-center justify-center flex-shrink-0">
                      <Wrench className="w-4 h-4" strokeWidth={1.75} />
                    </span>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14px] font-semibold text-text-base group-hover:text-jade transition-colors line-clamp-1">
                      {category.title}
                    </h3>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#a5b3bb] group-hover:text-jade group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Contact strip */}
        <section className="surface-panel p-5 sm:p-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <span className="eyebrow">Contact</span>
              <h2 className="display-sm mt-1.5 text-text-base">
                Niets gevonden?
              </h2>
              <p className="text-[13px] text-text-muted mt-1">
                Onze klantenservice helpt je graag verder.
              </p>
            </div>
            {[
              {
                icon: Phone,
                label: "Telefoon",
                value: "+31 (0)85 - 0479240",
                href: "tel:+31850479240",
              },
              {
                icon: Mail,
                label: "E-mail",
                value: "klantenservice@evservice.eu",
                href: "mailto:klantenservice@evservice.eu",
              },
              {
                icon: MessageCircle,
                label: "WhatsApp",
                value: "Stuur een bericht",
                href: "https://wa.me/31850479240",
              },
            ].map((c) => (
              <a
                key={c.label}
                href={c.href}
                className="surface-card p-4 hover:border-jade/40 hover:shadow-sm transition-all flex items-start gap-3"
              >
                <span className="w-9 h-9 rounded-md bg-jade/10 text-jade flex items-center justify-center flex-shrink-0">
                  <c.icon className="w-4 h-4" strokeWidth={1.75} />
                </span>
                <div className="min-w-0">
                  <p className="text-[12px] uppercase tracking-wider font-semibold text-text-muted">
                    {c.label}
                  </p>
                  <p className="text-[13.5px] font-medium text-text-base truncate mt-0.5">
                    {c.value}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
