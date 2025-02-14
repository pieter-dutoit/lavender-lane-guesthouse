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
    name: 'Rooms',
    path: '/rooms'
  },
  {
    name: 'About Us',
    path: '/about-us'
  },
  {
    name: 'Contact Us',
    path: '/contact-us'
  }
]
