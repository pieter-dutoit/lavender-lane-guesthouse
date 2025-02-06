import Link from 'next/link'

import { extractImageProps } from '@/lib/utils'
import { getSocials } from '@/lib/data'

import Image from '../../components/image'
import SectionHeader from '../../components/section-header'

export default async function SocialMedia() {
  const socialData = await getSocials()

  return (
    <section className='bg-gradient-to-b from-white to-gray-200 py-12 lg:py-20'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <SectionHeader label='Social Media' heading='Follow Us' />

        <ul className='mt-8 flex flex-wrap justify-center gap-8 lg:mt-12'>
          {socialData.map((social) => {
            const { name, link, icon } = social
            const { url } = extractImageProps(icon)

            return (
              <li key={url} className=''>
                <Link
                  href={link}
                  target='_blank'
                  className='flex items-center gap-2 lg:gap-4'
                >
                  <Image
                    height={30}
                    width={30}
                    src={url}
                    alt={name + ' link'}
                    className='size-8 rounded-lg bg-white p-1 shadow lg:size-12 lg:rounded-xl'
                  />
                  <span className='text-lg font-semibold lg:text-2xl'>
                    {name}
                  </span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
