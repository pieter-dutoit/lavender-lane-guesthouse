'use client'
import { useMemo, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

import { extractImageProps } from '@/lib/utils'
import { Gallery } from '@/payload/payload-types'

import Image from '../../components/image'

const NUM_IMAGES_ABOVE_FOLD = 6

export default function ImageGrid({ gallery }: { gallery: Gallery }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  )
  const dialogRef = useRef<HTMLDialogElement>(null)

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
    dialogRef.current?.showModal()
  }

  const closeModal = () => {
    dialogRef.current?.close()
  }

  const { images } = gallery

  // Pre-render previous and next image for better user experience
  const slidesToShow = useMemo(() => {
    if (selectedImageIndex === null) return []
    const prevSlide =
      selectedImageIndex - 1 < 0 ? images.length - 1 : selectedImageIndex - 1
    const nextSlide =
      selectedImageIndex + 1 === images.length ? 0 : selectedImageIndex + 1

    return [prevSlide, selectedImageIndex, nextSlide]
  }, [images.length, selectedImageIndex])

  return (
    <>
      <section className='lb:py-20 bg-gradient-to-b from-white to-gray-200 pb-12'>
        <div className='container mx-auto px-4 md:px-6 lg:px-8'>
          {/* Grid Layout */}
          <ul className='grid auto-rows-[40vw] grid-cols-2 gap-2 md:auto-rows-[14rem] md:grid-cols-3 md:gap-4 lg:auto-rows-[18rem] xl:grid-cols-4'>
            {images?.map((image, index) => {
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
                    onClick={() => openModal(index)}
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

      <dialog
        ref={dialogRef}
        className='top-1/2 left-1/2 w-9/10 max-w-7xl -translate-1/2 bg-transparent backdrop:bg-black/70'
        onClick={closeModal}
      >
        <div
          className='relative aspect-square rounded-lg bg-white p-2 lg:aspect-video'
          onClick={(e) => e.stopPropagation()}
        >
          <div className='relative size-full overflow-hidden rounded-lg bg-gray-950'>
            {slidesToShow.map((imageToShow) => {
              const selectedImage = images[imageToShow]
              if (typeof selectedImage === 'string') return null
              const { url, alt } = extractImageProps(selectedImage)
              const classes =
                imageToShow === selectedImageIndex ? '' : 'sr-only'

              return (
                <Image
                  src={url}
                  alt={alt}
                  key={url}
                  priority
                  fill
                  className={twMerge('object-contain object-center', classes)}
                  sizes='(max-width: 1450px) 85vw, 79rem'
                />
              )
            })}
          </div>
          {/* Close Button */}
          <button
            className='bg-opacity-50 hover:bg-opacity-75 absolute top-4 right-4 cursor-pointer rounded-full bg-black/50 p-1 text-white transition-colors duration-200'
            onClick={closeModal}
          >
            <X size={14} />
            <span className='sr-only'>Close modal</span>
          </button>

          {/* Previous Button */}
          <button
            onClick={() => setSelectedImageIndex(slidesToShow[0])}
            className='absolute top-1/2 left-0 size-8 -translate-y-1/2 translate-x-1 cursor-pointer bg-white'
          >
            <ChevronLeft className='size-8' />
            <span className='sr-only'>View previous image</span>
          </button>

          {/* Next Button */}
          <button
            onClick={() => setSelectedImageIndex(slidesToShow[2])}
            className='absolute top-1/2 right-0 size-8 -translate-x-1 -translate-y-1/2 cursor-pointer bg-white'
          >
            <ChevronRight className='size-8' />
            <span className='sr-only'>View next image</span>
          </button>

          {/* Image number display */}
          <div className='absolute bottom-1 left-1 bg-white px-2 py-1 text-sm font-semibold'>
            Image {(selectedImageIndex || 0) + 1} of {images?.length}
          </div>
        </div>
      </dialog>
    </>
  )
}
