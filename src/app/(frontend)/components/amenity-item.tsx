import { Amenity } from '@/payload/payload-types'
import { extractImageProps } from '@/lib/utils'
import Image from './image'

interface Props {
  amenity: Amenity | string
  variant?: 'default' | 'minimal'
  withImage?: boolean
}

export default function AmenityItem({
  amenity,
  variant = 'default',
  withImage = false
}: Props) {
  if (typeof amenity === 'string') return null
  const { id, name, description, icon, image, price } = amenity
  const { unit_price, unit_type } = price || {}
  const { url, alt } = extractImageProps(image || icon)

  if (withImage && image)
    return (
      <li
        key={id}
        className='flex items-center rounded-lg bg-white p-2 drop-shadow-sm md:col-span-2 lg:col-span-1 xl:col-span-2'
      >
        <div className='relative size-20 min-w-20 overflow-hidden rounded-md lg:size-28 lg:min-w-28'>
          <Image
            src={url}
            alt={alt}
            fill
            className='object-cover'
            sizes='(max-width:1024px) 5rem, 7rem'
          />
        </div>
        <div className='flex flex-col items-start pl-4'>
          <h4 className='text-lg font-medium text-gray-900 sm:text-xl'>
            {name}
          </h4>

          {variant !== 'minimal' && (
            <p className='mt-1 text-base text-gray-700'>{description}</p>
          )}

          {unit_price && unit_type && (
            <p className='mt-2 rounded-sm bg-green-600/30 px-2 font-semibold text-green-800'>
              R{unit_price} {unit_type}
            </p>
          )}
        </div>
      </li>
    )

  return (
    <li
      key={id}
      className={`flex gap-4 ${variant === 'minimal' ? 'items-center' : ''}`}
    >
      {image && (
        <div className='relative size-20 min-w-20 overflow-hidden rounded-md lg:size-28'>
          <Image
            src={url}
            alt={alt}
            fill
            className='object-cover'
            sizes='(max-width:1024px) 5rem, 7rem'
          />
        </div>
      )}

      <div className='flex size-12 min-w-12 items-center justify-center rounded-md bg-indigo-300 text-white'>
        {icon && (
          <Image
            src={url}
            alt={alt}
            height={20}
            width={20}
            className='size-6'
          />
        )}
      </div>

      <div className='-mt-1 flex flex-col items-start whitespace-normal'>
        <h4 className='leading-6 font-medium text-gray-900 sm:text-lg'>
          {name}
        </h4>

        {variant !== 'minimal' && (
          <p className='mt-1 text-base text-gray-700'>{description}</p>
        )}

        {unit_price && unit_type && (
          <p className='mt-1 rounded-sm bg-green-600/30 px-2 font-semibold text-green-900'>
            R{unit_price} {unit_type}
          </p>
        )}
      </div>
    </li>
  )
}
