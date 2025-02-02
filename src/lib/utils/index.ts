import { Media, SeoMedia } from '@/payload/payload-types'

export function extractImageProps(
  image: Media | string | SeoMedia | undefined
): {
  url: string
  alt: string
  width: number
  height: number
} {
  if (typeof image === 'string')
    return { url: image, alt: '', width: 0, height: 0 }
  const { url, alt, height, width } =
    typeof image === 'object'
      ? image
      : { url: '', alt: '', height: 0, width: 0 }
  return {
    url: url ?? '',
    alt: alt ?? '',
    height: height ?? 0,
    width: width ?? 0
  }
}
