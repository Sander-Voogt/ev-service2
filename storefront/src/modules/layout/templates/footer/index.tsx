import LocalizedClientLink from "@modules/common/components/localized-client-link"
import {
  IconPhone,
  IconMail,
  Logo,
  navLink,
} from "@modules/common/components/reusable-nav-elements"
import FooterSub from "./FooterSub"
import api from "@lib/ghost";

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
  // const { collections } = await (
  //   await import("@lib/data/collections")
  // ).listCollections({ fields: "*products" });
  // const productCategories = await (
  //   await import("@lib/data/categories")
  // ).listCategories();

  // Accordion state for mobile

  const blogs = await api.posts.browse({
      // filter: 'tag:hash-helpdesk', // Filter op de 'helpdesk' tag
      // include: 'tags',
      limit: '5',
      order: 'date ASC' // Sorteren op titel is vaak handig voor categorieën
    });

  return (
    <footer className="w-full bg-white text-green-900 border-t border-green-100">
      <div className="max-w-screen-xl mx-auto px-4 py-12 md:py-16">
        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-green-100">
          {/* Company Info / Logo */}
          <div className="flex flex-col items-start gap-4 pr-8">
            <div className="transform hover:scale-105 transition-transform duration-200">
              <Logo />
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <a
                href="mailto:klantenservice@evservice.eu"
                className="flex items-center gap-2 text-sm text-green-700 hover:text-green-900 transition-all duration-200 hover:translate-x-1 group"
              >
                <IconMail className="group-hover:scale-110 transition-transform duration-200" />
                <span>klantenservice@evservice.eu</span>
              </a>
            </div>
          </div>
          {/* Customer Service */}
          <div>
            <span className="font-bold text-lg mb-4 block">Klantenservice</span>
            <ul className="space-y-2 text-sm">
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
            <span className="font-bold text-lg mb-4 block">
              Laatste blogs
            </span>

            <ul className="space-y-2 text-sm">
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
            <span className="font-bold text-lg mb-4 block">My Account</span>
            <ul className="space-y-2 text-sm">
              <li>
                <LocalizedClientLink href="#account" className={navLink}>
                  My account
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="#orders" className={navLink}>
                  Orders
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="#addresses" className={navLink}>
                  Addresses
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="#cart" className={navLink}>
                  Shopping cart
                </LocalizedClientLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden pb-12 border-b border-green-100">
          {/* Company Info / Logo (always visible) */}
          <div className="flex flex-col items-start gap-4 pr-8 mb-6">
            <Logo />
            {/* <p className="text-sm text-green-700 mt-2">
              Your partner in sustainable e-mobility. We offer a comprehensive
              range of charging solutions and expert advice for your electric
              vehicle.
            </p> */}
            <div className="flex flex-col gap-2 mt-4">
              {/* <a
                href="tel:0851304170"
                className="flex items-center gap-2 text-sm text-green-700 hover:text-green-900 transition-colors"
              >
                <IconPhone />
                <span>085 130 4170</span>
              </a> */}
              <a
                href="mailto:klantenservice@evservice.eu"
                className="flex items-center gap-2 text-sm text-green-700 hover:text-green-900 transition-colors"
              >
                <IconMail />
                <span>klantenservice@evservice.eu</span>
              </a>
            </div>
          </div>
                  <FooterSub />

        </div>


        {/* Bottom section with social media and payment icons */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8">
          {/* Social Media */}
          <div className="flex items-center gap-3">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
              title="Follow us on Facebook"
            >
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
              title="Follow us on LinkedIn"
            >
              <svg className="w-5 h-5 text-gray-700" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.006 1.419-.103.249-.129.597-.129.946v5.44h-3.562s.048-8.811 0-9.728h3.562v1.381c.43-.666 1.199-1.616 2.922-1.616 2.135 0 3.753 1.395 3.753 4.402v5.561zM5.337 8.855c-1.144 0-1.915-.758-1.915-1.706 0-.968.77-1.706 1.906-1.706.887 0 1.915.738 1.915 1.706 0 .948-.769 1.706-1.906 1.706zm1.959 11.597H3.355V9.724h3.941v10.728zM22.224 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.224 0z"/>
              </svg>
            </a>
          </div>

          {/* Payment Icons */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {paymentIcons.map((icon) => (
              <div
                key={icon.alt}
                className="relative group"
                title={`We accept ${icon.alt}`}
              >
                <img
                  src={icon.src}
                  alt={icon.alt}
                  className="h-7 opacity-50 hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"
                  loading="lazy"
                />
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                  {icon.alt}
                </span>
              </div>
            ))}
          </div>

          {/* Legal Links & Copyright */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-xs text-green-600">
            <div className="order-2 md:order-1">
              Copyright © {new Date().getFullYear()} EV Service.
            </div>
            <div className="order-1 md:order-2 flex gap-2">
              <LocalizedClientLink
                href="#terms"
                className="hover:text-green-900"
              >
                General Terms
              </LocalizedClientLink>
              <span className="text-green-400">|</span>
              <LocalizedClientLink
                href="#privacy"
                className="hover:text-green-900"
              >
                Privacy Policy
              </LocalizedClientLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
