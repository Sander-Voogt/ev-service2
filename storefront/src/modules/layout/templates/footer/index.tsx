import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  IconMail,
  Logo,
  navLink,
} from "@modules/common/components/reusable-nav-elements"
import FooterSub from "./FooterSub"
import api from "@lib/ghost";
import { SITE_CONFIG } from "@lib/site-config"

const paymentIcons = [
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
    alt: "Mastercard",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg",
    alt: "PayPal",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/a/ad/IDEAL_%28Bezahlsystem%29_logo.svg",
    alt: "iDEAL Logo",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Bancontact_logo.svg",
    alt: "Bancontact Logo",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Single_Euro_Payments_Area_logo.svg",
    alt: "SEPA Logo",
  },
  {
    src: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
    alt: "Visa",
  },
]

export default async function Footer() {
  const blogs = await api.posts.browse({
      // filter: 'tag:hash-helpdesk', // Filter op de 'helpdesk' tag
      // include: 'tags',
      limit: '5',
      order: 'date ASC' // Sorteren op titel is vaak handig voor categorieën
    });

  return (
    <footer className="w-full bg-page text-text-base border-t border-border-base">
      <div className="max-w-screen-xl mx-auto px-4 py-10 md:py-12">
        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-border-base">
          {/* Company Info / Logo */}
          <div className="flex flex-col items-start gap-3 pr-8">
            <div className="transform hover:scale-105 transition-transform duration-200">
              <Logo />
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <a
                href={`mailto:${SITE_CONFIG.email.customerService}`}
                className="flex items-center gap-2 text-sm text-jade hover:text-jade transition-all duration-200 hover:translate-x-1 group"
              >
                <IconMail className="group-hover:scale-110 transition-transform duration-200" />
                <span>{SITE_CONFIG.email.customerService}</span>
              </a>
            </div>
          </div>
          {/* Customer Service */}
          <div>
            <span className="font-semibold text-[14px] mb-3 block">Klantenservice</span>
            <ul className="space-y-1.5 text-[13.5px]">
              <li>
                <LocalizedClientLink href="#about" className={`${navLink} inline-block transition-all duration-200 hover:translate-x-1`}>
                  Over EV Service
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="#faq" className={`${navLink} inline-block transition-all duration-200 hover:translate-x-1`}>
                  Veel gestelde vragen
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink href="#returns" className={`${navLink} inline-block transition-all duration-200 hover:translate-x-1`}>
                  Retourneren
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/blog" className={`${navLink} inline-block transition-all duration-200 hover:translate-x-1`}>
                  Blog
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="#contact" className={`${navLink} inline-block transition-all duration-200 hover:translate-x-1`}>
                  Contact
                </LocalizedClientLink>
              </li>
            </ul>
          </div>
          {/* Electric Driving */}
          <div>
            <span className="font-semibold text-[14px] mb-3 block">
              Laatste blogs
            </span>

            <ul className="space-y-1.5 text-[13.5px]">
              {blogs.map(blog => (
                 <li key={blog.id} >
                <LocalizedClientLink href={`/blog/${blog.slug}`} className={navLink}>
                  {blog.title}
                </LocalizedClientLink>
              </li>
              ))}
             
            </ul>
          </div>
          {/* My Account */}
          <div>
            <span className="font-semibold text-[14px] mb-3 block">Mijn Account</span>
            <ul className="space-y-1.5 text-[13.5px]">
              <li>
                <LocalizedClientLink href="/account" className={navLink}>
                  Mijn account
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/account/orders" className={navLink}>
                  Bestellingen
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/account/addresses" className={navLink}>
                  Adressen
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/cart" className={navLink}>
                  Winkelwagen
                </LocalizedClientLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden pb-8 border-b border-border-base">
          {/* Company Info / Logo (always visible) */}
          <div className="flex flex-col items-start gap-4 pr-8 mb-6">
            <Logo />
            <div className="flex flex-col gap-2 mt-4">
              <a
                href={`mailto:${SITE_CONFIG.email.customerService}`}
                className="flex items-center gap-2 text-sm text-jade hover:text-jade transition-colors"
              >
                <IconMail />
                <span>{SITE_CONFIG.email.customerService}</span>
              </a>
            </div>
          </div>
                  <FooterSub />

        </div>


        {/* Bottom section with social media and payment icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          {/* Social Media */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-page-soft hover:bg-page-tinted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jade"
              title="Follow us on Facebook"
            >
              <svg className="w-4 h-4 text-text-base" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-page-soft hover:bg-page-tinted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-jade"
              title="Follow us on LinkedIn"
            >
              <svg className="w-4 h-4 text-text-base" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.006 1.419-.103.249-.129.597-.129.946v5.44h-3.562s.048-8.811 0-9.728h3.562v1.381c.43-.666 1.199-1.616 2.922-1.616 2.135 0 3.753 1.395 3.753 4.402v5.561zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.706 0-.968.77-1.706 1.906-1.706.887 0 1.915.738 1.915 1.706 0 .948-.769 1.706-1.906 1.706zm1.959 11.597H3.355V9.724h3.941v10.728zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z"/>
              </svg>
            </a>
          </div>

          {/* Payment Icons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            {paymentIcons.map((icon) => (
              <div
                key={icon.alt}
                className="relative group"
                title={`We accept ${icon.alt}`}
              >
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className="h-5 opacity-60 hover:opacity-100 transition-opacity duration-200"
                  loading="lazy"
                />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {icon.alt}
                </span>
              </div>
            ))}
          </div>

          {/* Legal Links & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs text-text-muted">
            <div className="order-2 md:order-1">
              Copyright © {new Date().getFullYear()} EV Service.
            </div>
            <div className="order-1 md:order-2 flex gap-2">
              <LocalizedClientLink
                href="/pagina/algemene-voorwaarden"
                className="hover:text-jade"
              >
                Algemene voorwaarden
              </LocalizedClientLink>
              <span className="text-text-subtle">|</span>
              <LocalizedClientLink
                href="/pagina/privacybeleid"
                className="hover:text-jade"
              >
                Privacybeleid
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
