const path = require("path")

module.exports = {
  darkMode: "class",
  presets: [require("@medusajs/ui-preset")],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/modules/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@medusajs/ui/dist/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: "width margin",
        height: "height",
        bg: "background-color",
        display: "display opacity",
        visibility: "visibility",
        padding: "padding-top padding-right padding-bottom padding-left",
      },
      colors: {
        grey: {
          0: "#FFFFFF",
          5: "#F9FAFB",
          10: "#F3F4F6",
          20: "#E5E7EB",
          30: "#D1D5DB",
          40: "#9CA3AF",
          50: "#6B7280",
          60: "#4B5563",
          70: "#374151",
          80: "#1F2937",
          90: "#111827",
        },
        green: {
          default: '#338414',
          light: '#f1f8e9'
        }
      },
      borderRadius: {
        none: "0px",
        soft: "2px",
        base: "4px",
        rounded: "8px",
        large: "16px",
        circle: "9999px",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      screens: {
        "2xsmall": "320px",
        xsmall: "512px",
        small: "1024px",
        medium: "1280px",
        large: "1440px",
        xlarge: "1680px",
        "2xlarge": "1920px",
      },
      fontSize: {
        "3xl": "2rem",
      },
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Ubuntu",
          "sans-serif",
        ],
      },
      keyframes: {
        ring: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-out-top": {
          "0%": {
            height: "100%",
          },
          "99%": {
            height: "0",
          },
          "100%": {
            visibility: "hidden",
          },
        },
        "accordion-slide-up": {
          "0%": {
            height: "var(--radix-accordion-content-height)",
            opacity: "1",
          },
          "100%": {
            height: "0",
            opacity: "0",
          },
        },
        "accordion-slide-down": {
          "0%": {
            "min-height": "0",
            "max-height": "0",
            opacity: "0",
          },
          "100%": {
            "min-height": "var(--radix-accordion-content-height)",
            "max-height": "none",
            opacity: "1",
          },
        },
        enter: {
          "0%": { transform: "scale(0.9)", opacity: 0 },
          "100%": { transform: "scale(1)", opacity: 1 },
        },
        leave: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(0.9)", opacity: 0 },
        },
        "slide-in": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        fadeInSlideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInFromRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInFromLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
      animation: {
        ring: "ring 2.2s cubic-bezier(0.5, 0, 0.5, 1) infinite",
        "fade-in-right":
          "fade-in-right 0.3s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-in-top": "fade-in-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "fade-out-top":
          "fade-out-top 0.2s cubic-bezier(0.5, 0, 0.5, 1) forwards",
        "accordion-open":
          "accordion-slide-down 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        "accordion-close":
          "accordion-slide-up 300ms cubic-bezier(0.87, 0, 0.13, 1) forwards",
        enter: "enter 200ms ease-out",
        "slide-in": "slide-in 1.2s cubic-bezier(.41,.73,.51,1.02)",
        leave: "leave 150ms ease-in forwards",
        fadeInSlideUp: 'fadeInSlideUp 0.5s ease-out',
        slideInFromRight: 'slideInFromRight 0.5s ease-out',
        slideInFromLeft: 'slideInFromLeft 0.5s ease-out',
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            p: {
              lineHeight: '1.75', 
              marginBottom: '1.5rem', 
              marginTop: '1.5rem',
            },
            h2: {
              marginTop: '2rem',
              marginBottom: '1rem',
            },
            h3: {
              marginTop: '1.5rem',
              marginBottom: '0.5rem',
            },
            a: {
              textDecoration: 'underline',
              fontWeight: 'bold',
              color: theme('colors.blue.600'), 
            },
            hr: {
              marginTop: '2.5rem',
              marginBottom: '2.5rem',
              borderColor: theme('colors.grey.20'),
            },
            table: {
              marginTop: '2rem',
              marginBottom: '2rem',
              borderCollapse: 'collapse',
              width: '100%',
            },
            th: {
              backgroundColor: theme('colors.grey.10'),
              fontWeight: 'bold',
              padding: '0.75rem',
              border: `1px solid ${theme('colors.grey.20')}`,
            },
            td: {
              padding: '0.75rem',
              border: `1px solid ${theme('colors.grey.20')}`,
            },
            figure: {
              marginTop: '2rem',
              marginBottom: '2rem',
              textAlign: 'center',
              display: 'inline-flex', 
              flexDirection: 'row',   
              gap: '1rem',            
              width: '300px',
              height: '300px',
              position: 'relative',
              alignItems: 'center',
              justifyContent: 'center',
            },
            figcaption: {
              marginTop: '0.5rem',
              color: theme('colors.grey.50'),
              fontSize: theme('fontSize.sm'),
            },
            img: {
              display: 'block',
              marginLeft: 'auto',
              marginRight: 'auto',
              maxWidth: '100%',
              maxHeight: '100%',
              borderRadius: theme('borderRadius.base'),
              objectFit: 'contain', 
            },
            'figure img': {
              width: '100%',
              height: '100%',
              maxWidth: '400px',
              maxHeight: '300px',
              objectFit: 'contain',
              borderRadius: theme('borderRadius.base'),
            },
          },
        },
        green: {
          css: {
            '--tw-prose-body': theme('colors.green.800'),
            '--tw-prose-headings': theme('colors.green.900'),
            '--tw-prose-links': theme('colors.green.600'),
            a: {
              textDecoration: 'underline',
              fontWeight: 'bold',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require("tailwindcss-radix")(),
    require('@tailwindcss/typography')(),
  ],
}