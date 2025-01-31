'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Image from './image'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className='bg-white shadow-sm'>
      <div className='mx-auto px-4 py-1 sm:px-8'>
        <div className='flex h-12 justify-between sm:h-16'>
          {/* Logo */}
          <div className='relative h-full w-40'>
            <Link href='/' className='text-2xl font-bold text-indigo-600'>
              <Image
                src='/cms/api/media/file/logo-1.webp'
                alt='logo'
                fill
                className='object-contain object-left'
                sizes='10rem'
              />
            </Link>
          </div>

          <div className='hidden sm:ml-6 sm:flex sm:space-x-8'>
            <Link
              href='/'
              className='inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-base font-medium text-gray-900'
            >
              Home
            </Link>
            <Link
              href='#rooms'
              className='inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-base font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            >
              Rooms
            </Link>
            <Link
              href='#'
              className='inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-base font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            >
              About
            </Link>
            <Link
              href='#'
              className='inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-base font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700'
            >
              Contact
            </Link>
          </div>
          <div className='-mr-2 flex items-center sm:hidden'>
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
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`sm:hidden ${isOpen ? 'block' : 'hidden'}`}
        id='mobile-menu'
      >
        <div className='space-y-1 pt-2 pb-3'>
          <Link
            href='/'
            className='block border-l-4 border-indigo-500 bg-indigo-50 py-2 pr-4 pl-3 text-lg font-medium text-indigo-700'
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href='#rooms'
            className='block border-l-4 border-transparent py-2 pr-4 pl-3 text-lg font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
            onClick={toggleMenu}
          >
            Rooms
          </Link>
          <Link
            href='#'
            className='block border-l-4 border-transparent py-2 pr-4 pl-3 text-lg font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            href='#'
            className='block border-l-4 border-transparent py-2 pr-4 pl-3 text-lg font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700'
            onClick={toggleMenu}
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  )
}
