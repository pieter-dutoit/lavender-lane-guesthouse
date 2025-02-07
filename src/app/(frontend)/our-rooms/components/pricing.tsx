import { Check, Info, Users } from 'lucide-react'

import { getPrices } from '@/lib/data'

import SectionHeader from '../../components/section-header'

const includedAmenities = [
  'Free WiFi',
  'Daily cleaning',
  'Basic amenities',
  'Access to all facilities'
]

export default async function Pricing() {
  const { base_price, additional_guest, price_items } = await getPrices()

  return (
    <section
      className='bg-gradient-to-b from-white to-gray-200 py-12 lg:py-20'
      id='rooms'
    >
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeader
          label='Fees'
          heading='Pricing Information'
          description='Transparent pricing for a comfortable stay.'
        />

        <div className='mt-12 overflow-hidden rounded-lg bg-gray-50 shadow-lg'>
          <div className='px-6 py-8 sm:p-10 sm:pb-6'>
            <div className='flex items-center justify-center'>
              <span className='text-5xl font-extrabold text-gray-900'>
                R{base_price}
              </span>
              <span className='ml-3 text-xl font-medium text-gray-500'>
                /night
              </span>
            </div>
            <p className='mt-4 text-center text-sm text-gray-500'>
              Base rate for any room (includes 1 guest)
            </p>
          </div>
          <div className='px-6 pt-0 pb-8 sm:p-10 sm:pt-0'>
            <div className='mb-6 flex items-center justify-center'>
              <Users className='mr-2 h-6 w-6 text-indigo-500' />
              <span className='text-lg font-semibold text-gray-900'>
                Additional Guests:
              </span>
              <span className='ml-2 text-lg font-bold text-indigo-600'>
                R{additional_guest}
              </span>
              <span className='ml-1 text-sm text-gray-500'>
                per person per night
              </span>
            </div>
            <ul className='mt-8 space-y-4'>
              {includedAmenities.map((amenity) => (
                <li key={amenity} className='flex items-start'>
                  <div className='flex-shrink-0'>
                    <Check
                      className='h-6 w-6 text-green-500'
                      aria-hidden='true'
                    />
                  </div>
                  <p className='ml-3 text-base text-gray-700'>{amenity}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Other prices */}
        <div className='mt-8'>
          <h3 className='mb-4 text-xl font-semibold text-gray-900'>
            Additional Services
          </h3>
          <div className='overflow-hidden bg-white shadow sm:rounded-md'>
            <ul className='divide-y divide-gray-200'>
              {price_items?.map(({ item_name, item_price, unit_type }) => (
                <li key={item_name}>
                  <div className='px-4 py-4 sm:px-6'>
                    <div className='flex items-center justify-between'>
                      <p className='truncate font-medium text-indigo-600'>
                        {item_name}
                      </p>
                      <div className='ml-2 flex flex-shrink-0'>
                        <p className='inline-flex rounded-full bg-green-100 px-2 text-sm leading-5 font-semibold text-green-800'>
                          R{item_price} {unit_type}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Warning */}
        <div className='mt-8 border-l-4 border-yellow-400 bg-yellow-50 p-4'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <Info className='h-5 w-5 text-yellow-400' aria-hidden='true' />
            </div>
            <div className='ml-3'>
              <p className='text-yellow-700'>
                Apart from the room rate, other costs are available on-demand
                and payable at the property.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
