'use client'

import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { navLink } from "@modules/common/components/reusable-nav-elements";
import { useState } from "react";


export default function FooterSub(){
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // Accordion toggle handler
  const handleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };
    return(
        <>
        {/* Accordion Section: Customer Service */}
          <div className="border-b border-green-100">
            <button
              className="w-full flex justify-between items-center py-4 font-bold text-lg focus:outline-none"
              onClick={() => handleAccordion("customer")}
              aria-expanded={openAccordion === "customer"}
            >
              Customer service
              <svg
                className={`transform transition-transform w-5 h-5 text-green-700 ${openAccordion === "customer" ? "rotate-180" : "rotate-0"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openAccordion === "customer" && (
              <ul className="space-y-2 text-sm pb-4">
                <li>
                  <LocalizedClientLink href="#about" className={navLink}>
                    About EV Service
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="#faq" className={navLink}>
                    Frequently Asked Questions
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="#buyback" className={navLink}>
                    Buyback guarantee
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="#returns" className={navLink}>
                    Returns
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
            )}
          </div>

          {/* Accordion Section: Electric Driving */}
          <div className="border-b border-green-100">
            <button
              className="w-full flex justify-between items-center py-4 font-bold text-lg focus:outline-none"
              onClick={() => handleAccordion("electric")}
              aria-expanded={openAccordion === "electric"}
            >
              Electric Driving
              <svg
                className={`transform transition-transform w-5 h-5 text-green-700 ${openAccordion === "electric" ? "rotate-180" : "rotate-0"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openAccordion === "electric" && (
              <ul className="space-y-2 text-sm pb-4">
                <li>
                  <LocalizedClientLink href="#cable-choice" className={navLink}>
                    Which charging cable should I choose?
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink href="#installation" className={navLink}>
                    Charging station including installation
                  </LocalizedClientLink>
                </li>
                {/* Add other relevant links here */}
              </ul>
            )}
          </div>

          {/* Accordion Section: My Account */}
          <div className="border-b border-green-100">
            <button
              className="w-full flex justify-between items-center py-4 font-bold text-lg focus:outline-none"
              onClick={() => handleAccordion("account")}
              aria-expanded={openAccordion === "account"}
            >
              My Account
              <svg
                className={`transform transition-transform w-5 h-5 text-green-700 ${openAccordion === "account" ? "rotate-180" : "rotate-0"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openAccordion === "account" && (
              <ul className="space-y-2 text-sm pb-4">
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
            )}
          </div>
        </>
    )
}