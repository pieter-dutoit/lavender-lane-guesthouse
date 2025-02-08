import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import {
  type JSXConvertersFunction,
  RichText
} from '@payloadcms/richtext-lexical/react'

import { fetchHomePageData, getBookingPlatform } from '@/lib/data'
import { extractImageProps } from '@/lib/utils'

import Image from './image'

const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  heading: (h) => {
    if (h.node.tag === 'h1') {
      return (
        <h1 className='[&_em]: text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl [&_em]:text-indigo-600 [&_em]:not-italic'>
          {h.nodesToJSX({ nodes: h.node.children })}
        </h1>
      )
    }
    return h.nodesToJSX({ nodes: h.node.children })
  },
  paragraph: (h) => (
    <p className='mt-3 text-base text-gray-600 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-8 md:text-xl lg:mx-0 [&_strong]:font-extrabold'>
      {h.nodesToJSX({ nodes: h.node.children })}
    </p>
  )
})

export default async function Hero() {
  const bookingPlatform = await getBookingPlatform()
  const data = await fetchHomePageData('hero')
  if (!data?.hero) return <></>

  const {
    hero: { background_image, heading, subheading }
  } = data

  const { url, alt } = extractImageProps(background_image)

  return (
    <section className='relative w-full overflow-hidden'>
      {/* Container */}
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <div className='relative z-10 my-8 w-full bg-white sm:my-16 sm:text-center lg:mt-20 lg:mb-0 lg:w-11/20 lg:py-20 lg:text-left'>
          {/* Heading */}
          <RichText data={heading} converters={jsxConverters} />

          {/* Sub heading */}
          <RichText data={subheading} converters={jsxConverters} />

          {/* CTAs */}
          <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
            <div className='rounded-md shadow'>
              <Link
                href={bookingPlatform.url}
                className='flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:px-10 md:py-4 md:text-lg'
                target='_blank'
              >
                Book Now <ExternalLink size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='relative h-56 w-full bg-purple-100 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-1/2'>
        <Image
          src={url}
          alt={alt}
          className='object-cover object-center'
          fill
          sizes='(max-width: 1024px) 100vw, 50vw'
          priority
        />
      </div>
    </section>
  )
}
