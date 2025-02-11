import { Metadata } from 'next'

import {
  MetadataField,
  OpenGraphField,
  TwitterField
} from '@/payload/payload-types'

import { extractImageProps, getBaseUrl } from '.'

interface SEO {
  path: string
  meta: MetadataField
  open_graph: OpenGraphField
  twitter?: TwitterField
}

export default function createMetadataConfig(seo: SEO): Metadata {
  const { path, meta, open_graph, twitter } = seo

  const {
    url: ogURL,
    alt: ogAlt,
    width: ogWidth,
    height: ogHeight
  } = extractImageProps(open_graph.image)

  return {
    // Basic fields:
    metadataBase: new URL(getBaseUrl()),
    alternates: {
      canonical: path
    },
    generator: 'Next.js',
    applicationName: 'Lavender Lane Guesthouse',
    referrer: 'strict-origin-when-cross-origin',
    robots: {
      index: true,
      follow: true,
      nocache: false
    },
    // Meta:
    title: {
      default: meta.title,
      template: '%s | Lavender Lane Guesthouse'
    },
    description: meta.description,
    // Opengraph:
    openGraph: {
      title: open_graph.title,
      description: open_graph.description,
      siteName: open_graph.site_name,
      type: 'website',
      images: [
        {
          url: ogURL,
          alt: ogAlt,
          height: ogHeight,
          width: ogWidth
        }
      ]
    },
    // Twitter:
    twitter: {
      card: 'summary_large_image',
      title: open_graph.title,
      description: open_graph.description,
      ...(twitter?.creator && {
        creator: twitter.creator
      }),
      ...(twitter?.creatorId && {
        creatorId: twitter.creatorId
      }),
      ...(typeof open_graph.image === 'object'
        ? {
            images: [open_graph.image.sizes?.twitter?.url || ogURL || '']
          }
        : {})
    }
  }
}
