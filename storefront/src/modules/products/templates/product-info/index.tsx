import { HttpTypes } from "@medusajs/types"
import { Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type ProductInfoProps = {
  product: HttpTypes.StoreProduct
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div id="product-info" className="space-y-6">
      <div className="space-y-6">
        {/* Premium breadcrumb navigation */}
        {product.collection && (
          <LocalizedClientLink
            href={`/collections/${product.collection.handle}`}
            className="inline-flex items-center gap-3 text-green-700 hover:text-green-800 font-bold text-sm transition-all duration-300 group bg-green-50 hover:bg-green-100 px-4 py-2 rounded-full"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>{product.collection.title}</span>
          </LocalizedClientLink>
        )}

        {/* Premium title with gradient text */}
        <div className="space-y-4">
          <Heading
            level="h2"
            className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent leading-tight"
            data-testid="product-title"
          >
            {product.title}
          </Heading>

          {/* Rating badge */}
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-50 to-amber-50 px-4 py-2 rounded-full border border-yellow-200">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                </svg>
              ))}
            </div>
            <span className="font-black text-gray-900">4.9</span>
            <span className="text-gray-600">•</span>
            <span className="text-gray-600 font-medium">128 reviews</span>
          </div>
        </div>

        {/* Premium description with better typography */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-200">
          <Text
            className="text-lg text-gray-700 whitespace-pre-line leading-relaxed font-medium"
            data-testid="product-description"
          >
            {product.description}
          </Text>
        </div>

        {/* Premium features */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🚚", text: "Free Shipping" },
            { icon: "🛡️", text: "2 Year Warranty" },
            { icon: "✓", text: "Certified Quality" },
            { icon: "💬", text: "Expert Support" }
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-300 group">
              <span className="text-2xl group-hover:scale-110 transition-transform">{feature.icon}</span>
              <span className="font-bold text-gray-900 text-sm">{feature.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductInfo