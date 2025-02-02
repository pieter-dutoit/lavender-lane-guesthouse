import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import config from '@payload-config'
import { HomePage } from '@/payload/payload-types'

type HomePageData = Partial<HomePage>

export const fetchHomePageData = unstable_cache(
  async (field?: string): Promise<HomePageData> => {
    const payload = await getPayload({ config })
    const res = await payload.findGlobal({
      slug: 'home-page',
      depth: 2,
      ...(field && { select: { [field]: true } })
    })
    if (!res) {
      throw new Error('Failed to fetch home page data')
    }
    return res
  },
  [],
  { revalidate: false, tags: ['home-page'] }
)
