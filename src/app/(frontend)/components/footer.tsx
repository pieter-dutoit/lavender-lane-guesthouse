import Link from 'next/link'
import { Mail, MapPin, Phone } from 'lucide-react'

import { NAV_LINKS } from '@/lib/config'
import { getContacts, getSocials } from '@/lib/data'
import { extractContactDetails, extractImageProps } from '@/lib/utils'

import Image from './image'

export default async function Footer() {
  const contactsData = await getContacts()
  const contacts = extractContactDetails(contactsData)

  const socialData = await getSocials()

  return (
    <footer className='bg-black/85 text-white'>
      <div className='container mx-auto px-4 py-12 md:px-6 lg:px-8 lg:py-20'>
        <div className='grid grid-cols-1 gap-8 md:grid-cols-3'>
          {/* Left-hand content */}
          <div>
            <h2 className='mb-4 text-lg font-semibold sm:text-xl'>
              Lavender Lane Guesthouse
            </h2>

            {/* Address */}
            <div className='mt-4 flex flex-col gap-4'>
              <p> 17 Nieshout Street, Kathu, 8446</p>
              <Link
                href='https://maps.app.goo.gl/KR5bnydJB9HdNGMs8'
                className='flex items-center gap-1 text-indigo-200 underline underline-offset-2'
                target='_blank'
              >
                <MapPin className='size-4' />
                Get Directions
              </Link>
            </div>

            {/* Contact details */}
            <ul className='mt-4 lg:mt-8'>
              {contacts.map(({ phone, phoneLink, email }) => (
                <li key={email} className='mt-4 space-y-4'>
                  <Link
                    href={`mailto:${email}`}
                    className='flex items-center gap-2'
                  >
                    <Mail className='size-4 text-white' />
                    <span>{email}</span>
                  </Link>
                  <Link
                    href={`tel:+27${phoneLink}`}
                    className='flex items-center gap-2'
                  >
                    <Phone className='size-4 text-white' />
                    <span>{phone}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Center content */}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Quick Links</h3>
            <ul className='space-y-2'>
              {NAV_LINKS.map(({ name, path }) => (
                <li key={path}>
                  <Link href={path} className='hover:text-indigo-400'>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right-hand content */}
          <div>
            <h3 className='mb-4 text-lg font-semibold'>Connect With Us</h3>
            <ul className='flex space-x-4'>
              {socialData?.map((social) => {
                const { name, link, icon } = social
                const { url } = extractImageProps(icon)

                return (
                  <li key={url} className='rounded-xl bg-indigo-50 p-1'>
                    <Link href={link} target='_blank'>
                      <Image
                        height={30}
                        width={30}
                        src={url}
                        alt={name + ' link'}
                      />
                      <span className='sr-only'>{name}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className='mt-8 border-t border-gray-100 pt-8 text-center'>
          <p className='text-gray-300'>
            &copy; {new Date().getFullYear()} Lavender Lane Guesthouse. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
