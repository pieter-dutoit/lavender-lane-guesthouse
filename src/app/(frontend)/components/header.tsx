'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ExternalLink, Menu, X } from 'lucide-react'

import Image from './image'
import { NAV_LINKS } from '@/lib/config'
import { Logo } from '@/payload/payload-types'
import { extractImageProps } from '@/lib/utils'

interface Props {
  bookingLink: string
  logo: Logo
}

export default function Header({ bookingLink, logo }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const LINKS = useMemo(
    () => [
      ...NAV_LINKS,
      {
        name: 'Book Now',
        path: bookingLink || '#',
        external: true
      }
    ],
    [bookingLink]
  )

  const { url, alt } = extractImageProps(logo.logo)

  return (
    <header className='sticky top-0 z-50 bg-white shadow-sm'>
      <nav className='container mx-auto px-4 md:px-6 lg:px-8'>
        <div className='flex h-16 justify-between'>
          {/* Logo */}
          <Link
            href='/'
            className='h-full py-1 text-2xl font-bold text-indigo-600'
          >
            <div className='relative h-full w-32 sm:w-40'>
              <Image
                src={url}
                alt={alt}
                fill
                className='object-contain object-left'
                sizes='10rem'
              />
            </div>
          </Link>

          {/* Desktop Menu */}
          <ul className='hidden lg:ml-6 lg:flex lg:space-x-8'>
            {LINKS.map(({ path, name, external }) => {
              const isActive = path === pathname

              return (
                <li key={path} className='h-full'>
                  <Link
                    href={path}
                    className={` ${isActive ? 'border-indigo-500' : 'border-transparent'} ${external ? 'font-extrabold text-indigo-600' : 'font-medium text-gray-500'} flex h-full items-center gap-2 border-b-2 px-1 pt-1 text-base hover:border-gray-300 hover:text-gray-700`}
                    {...(external && {
                      target: '_blank'
                    })}
                  >
                    {name}
                    {external && <ExternalLink size={16} />}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className='-mr-2 flex items-center lg:hidden'>
            <button
              onClick={toggleMenu}
              type='button'
              className='inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500 focus:outline-none focus:ring-inset'
              aria-controls='mobile-menu'
              aria-expanded='false'
            >
              <span className='sr-only'>Open main menu</span>
              {isOpen ? (
                <X className='block h-6 w-6' aria-hidden='true' />
              ) : (
                <Menu className='block h-6 w-6' aria-hidden='true' />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}

      <nav
        className={`lg:hidden ${isOpen ? 'absolute' : 'hidden'} top-full left-0 w-full border-b-2 border-gray-300 bg-white`}
        id='mobile-menu'
      >
        <ul className='space-y-1 pt-2 pb-3'>
          {LINKS.map(({ path, name, external }) => {
            const isActive = path === pathname

            return (
              <li key={path} onClick={toggleMenu}>
                <Link
                  href={path}
                  className={`${isActive ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-white bg-white text-gray-500'} flex items-center gap-2 border-l-4 py-2 pr-4 pl-3 text-lg font-medium`}
                  {...(external && {
                    target: '_blank'
                  })}
                >
                  {name}
                  {external && <ExternalLink size={16} />}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}
