import { Wifi, Coffee, Utensils, MapPin } from 'lucide-react'

const features = [
  {
    name: 'Free Wi-Fi',
    description: 'Stay connected with our high-speed internet access.',
    icon: Wifi
  },
  {
    name: 'Breakfast Included',
    description:
      'Start your day right with our delicious complimentary breakfast.',
    icon: Coffee
  },
  {
    name: 'Fully Equipped Kitchen',
    description:
      'Cook your favorite meals in our modern, fully equipped kitchen.',
    icon: Utensils
  },
  {
    name: 'Prime Location',
    description: 'Conveniently located near popular attractions and amenities.',
    icon: MapPin
  }
]

export default function Amenities() {
  return (
    <div className='bg-white py-12'>
      <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
        <div className='lg:text-center'>
          <h2 className='text-base font-semibold tracking-wide text-indigo-600 uppercase'>
            Amenities
          </h2>
          <p className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
            Everything you need for a comfortable stay
          </p>
          <p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
            We've thought of every detail to make your stay as enjoyable as
            possible.
          </p>
        </div>

        <div className='mt-10'>
          <dl className='space-y-10 md:grid md:grid-cols-2 md:gap-x-8 md:space-y-0 md:gap-y-10'>
            {features.map((feature) => (
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
    </div>
  )
}
