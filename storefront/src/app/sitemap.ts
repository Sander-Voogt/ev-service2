import { sdk } from '@lib/config';
import { getCategoriesList } from '@lib/data/categories';
import { getCollectionsList } from '@lib/data/collections';
import { getProductsList } from '@lib/data/products'
import api from '@lib/ghost';
import type { MetadataRoute } from 'next'


export default async function sitemap({
  id,
}: {
  id: number
}): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  type RecordList = {
    url: string,
    lastModified: string,
    changeFrequency: "yearly" | "always" | "hourly" | "daily" | "weekly" | "monthly" | "never" | undefined;
    priority?: number | undefined;
  }

  let next = 0
  const recordlist: RecordList[] = []
  while (next !== null) {

    const { response, nextPage } = await getProductsList({ 
      pageParam: next, countryCode: 'nl',
    })
    
    response.products.map((product) => (
      recordlist.push({
        url: `https://dddd.nl/products/${product.handle}`,
        lastModified: product.updated_at ? product.updated_at : '-',
        changeFrequency: 'weekly',
        priority: 1,
      })
    ))

    if (nextPage != null) {
      next = nextPage
    } else {
      // @ts-ignore
      next = null
    }

  }

  const collections = await getCollectionsList()
  const categories = await getCategoriesList()

  collections.collections.map((collection) => (
      recordlist.push({
        url: `https://dddd.nl/collections/${collection.handle}`,
        lastModified: collection.updated_at ? collection.updated_at : '-',
        changeFrequency: 'weekly',
        priority: 1,
      })
    ))

    categories.product_categories.map((category) => (
      recordlist.push({
        url: `https://dddd.nl/categories/${category.handle}`,
        lastModified: category.updated_at ? category.updated_at : '-',
        changeFrequency: 'weekly',
        priority: 1,
      })
    ))

    const posts = await api.posts.browse({ limit: "all" })
    posts.map((post) => (
      recordlist.push({
        url: `https://dddd.nl/blog/${post.slug}`,
        lastModified: post.updated_at ? post.updated_at : '-',
        changeFrequency: 'weekly',
        priority: 1,
      })
    ))

    const brands = await sdk.client.fetch(`/store/carbrand/models`);
    brands.brands.map((brand) => (
      recordlist.push({
        url: `https://dddd.nl/auto/${string_to_slug(brand.name.toLowerCase())}`,
        lastModified: brand.updated_at ? brand.updated_at : '-',
        changeFrequency: 'weekly',
        priority: 1,
      })
    ))

  return recordlist


}
