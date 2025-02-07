'use client'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

import { extractImageProps } from '@/lib/utils'
import { Gallery } from '@/payload/payload-types'

import SectionHeader from '../../components/section-header'
import Image from '../../components/image'

const NUM_IMAGES_ABOVE_FOLD = 6

export default function ImageGrid({ gallery }: { gallery: Gallery }) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const { images } = gallery

  function handleSelectImage(index: number) {
    setSelectedImage(index)
  }

  return (
    <>
      <section className='bg-gray-100 py-12 lg:py-20'>
        <div className='container mx-auto px-4 md:px-6 lg:px-8'>
          <SectionHeader label='Take a look' heading='Photo Gallery' />

          {/* Grid Layout */}
          <ul className='mt-12 grid auto-rows-[40vw] grid-cols-2 gap-2 md:auto-rows-[14rem] md:grid-cols-3 md:gap-4 lg:mt-20 lg:auto-rows-[18rem] xl:grid-cols-4'>
            {images.map((image, index) => {
              if (typeof image === 'string') return null
              const { url, alt } = extractImageProps(image)
              const { height, width } = image
              const isPriority = index < NUM_IMAGES_ABOVE_FOLD
              const rowSpan =
                Math.ceil((height || 1) / (width || 1)) === 1
                  ? 'row-span-1'
                  : 'row-span-2'

              return (
                <li key={url} className={twMerge('col-span-1', rowSpan)}>
                  <button
                    className='relative size-full cursor-pointer overflow-hidden rounded-lg bg-indigo-100 outline-indigo-500 drop-shadow-md hover:outline-2 focus:outline-2'
                    onClick={() => handleSelectImage(index)}
                  >
                    <Image
                      src={url}
                      alt={alt}
                      fill
                      className='object-cover object-center'
                      priority={isPriority}
                      sizes='(max-width: 768px) 45vw, (max-width: 1280px) 14rem, 19rem'
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <dialog open={typeof selectedImage === 'number'}>hi</dialog>
    </>
  )
}
