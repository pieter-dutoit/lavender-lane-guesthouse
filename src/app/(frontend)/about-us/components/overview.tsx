import { Home, Users, Coffee, MapPin } from 'lucide-react'
import SectionHeading from '../../components/section-heading'

export default function Overview() {
  return (
    <section className='bg-gradient-to-b from-white to-gray-100 py-12 lg:py-20'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeading
          label='Overview'
          heading='Experience Comfort and Hospitality'
          description='Situated at 17 Nieshout Avenue in Kathu, Lavender Lane offers a
            perfect blend of comfort and friendly service.'
        />

        <div className='mt-16'>
          <dl className='space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:space-y-0 md:gap-y-10'>
            {[
              {
                name: 'Modern Rooms',
                description:
                  '15 tastefully decorated rooms with contemporary design',
                icon: Home
              },
              {
                name: 'Friendly Staff',
                description:
                  'Our team has over 20 years of hospitality experience',
                icon: Users
              },
              {
                name: 'Complimentary Amenities',
                description:
                  'Enjoy free WiFi, coffee stations, and daily room service',
                icon: Coffee
              },
              {
                name: 'Prime Location',
                description:
                  'Conveniently located in Kathu, perfect for your stay',
                icon: MapPin
              }
            ].map((feature) => (
              <div key={feature.name} className='relative'>
                <dt>
                  <div className='absolute flex h-12 w-12 items-center justify-center rounded-md bg-indigo-500 text-white'>
                    <feature.icon className='h-6 w-6' aria-hidden='true' />
                  </div>
                  <p className='ml-16 text-lg leading-6 font-medium text-gray-900'>
                    {feature.name}
                  </p>
                </dt>
                <dd className='mt-2 ml-16 text-base text-gray-500'>
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
