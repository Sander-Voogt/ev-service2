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
    <footer className="w-full bg-white text-green-900 border-t border-green-100 mt-20">
      <div className="max-w-screen-xl mx-auto px-4 py-12 md:py-16">
        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-green-100">
          {/* Company Info / Logo */}
          <div className="flex flex-col items-start gap-4 pr-8">
            <Logo />
            <p className="text-sm text-green-700 mt-2">
              Your partner in sustainable e-mobility. We offer a comprehensive
              range of charging solutions and expert advice for your electric
              vehicle.
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <a
                href="tel:0851304170"
                className="flex items-center gap-2 text-sm text-green-700 hover:text-green-900 transition-colors"
              >
                <IconPhone />
                <span>085 130 4170</span>
              </a>
              <a
                href="mailto:klantenservice@evservice.eu"
                className="flex items-center gap-2 text-sm text-green-700 hover:text-green-900 transition-colors"
              >
                <IconMail />
                <span>klantenservice@evservice.eu</span>
              </a>
            </div>
          </div>
          {/* Customer Service */}
          <div>
            <span className="font-bold text-lg mb-4 block">Klantenservice</span>
            <ul className="space-y-2 text-sm">
              <li>
                <LocalizedClientLink href="#about" className={navLink}>
                  Over EV Service
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="#faq" className={navLink}>
                  Veel gestelde vragen
                </LocalizedClientLink>
              </li>

              <li>
                <LocalizedClientLink href="#returns" className={navLink}>
                  Retourneren
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="/blog" className={navLink}>
                  Blog
                </LocalizedClientLink>
              </li>
              <li>
                <LocalizedClientLink href="#contact" className={navLink}>
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
            <p className="text-sm text-green-700 mt-2">
              Your partner in sustainable e-mobility. We offer a comprehensive
              range of charging solutions and expert advice for your electric
              vehicle.
            </p>
            <div className="flex flex-col gap-2 mt-4">
              <a
                href="tel:0851304170"
                className="flex items-center gap-2 text-sm text-green-700 hover:text-green-900 transition-colors"
              >
                <IconPhone />
                <span>085 130 4170</span>
              </a>
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
          <div className="flex items-center gap-4 text-sm text-green-700">
            <a
              href="#facebook"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 hover:bg-green-100 transition-colors"
            >
              f
            </a>
            <a
              href="#linkedin"
              className="w-8 h-8 flex items-center justify-center rounded-full bg-green-50 hover:bg-green-100 transition-colors"
            >
              in
            </a>
          </div>

          {/* Payment Icons */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {paymentIcons.map((icon) => (
              <img
                key={icon.alt}
                src={icon.src}
                alt={icon.alt}
                className="h-6 opacity-60 hover:opacity-100 transition-opacity"
              />
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
