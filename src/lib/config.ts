type NavLink = {
  name: string
  path: string
  external?: boolean
}

export const NAV_LINKS: NavLink[] = [
  {
    name: 'Home',
    path: '/'
  },
  {
    name: 'Gallery',
    path: '/gallery'
  },
  {
    name: 'Rooms & Prices',
    path: '/our-rooms'
  },
  {
    name: 'About',
    path: '/about-us'
  },
  {
    name: 'Contact Us',
    path: '/contact-us'
  }
]
