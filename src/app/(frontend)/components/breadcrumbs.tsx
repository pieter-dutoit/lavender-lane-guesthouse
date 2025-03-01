import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  name: string
  item?: string
}

interface Props {
  crumbs: BreadcrumbItem[]
}

export default function Breadcrumbs({ crumbs }: Props) {
  return (
    <nav
      className='absolute top-18 right-0 left-0 flex w-full md:top-20'
      aria-label='Breadcrumb'
    >
      <ol className='container mx-auto inline-flex items-center space-x-1 px-4 md:space-x-3 md:px-6 lg:px-8'>
        <li className='inline-flex items-center'>
          <Link
            href='/'
            className='inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600'
          >
            Home
          </Link>
        </li>
        {crumbs.map(({ name, item }, index) => (
          <li key={index + name}>
            <div className='flex items-center'>
              <ChevronRight className='size-4 text-gray-400' />
              <Link
                href={item}
                className={`ml-1 text-sm font-medium ${index === crumbs.length - 1 ? 'text-indigo-600' : 'text-gray-700'} hover:text-indigo-600 md:ml-2`}
              >
                {name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}
