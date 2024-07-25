const links = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Restaurants',
    href: '/scaffold/restaurants/list'
  },
  {
    name: 'Reservations',
    href: '/scaffold/reservations/list'
  }
]

export function Navbar() {
  return (
    <ul>
      {links.map(({ name, href }) => (
        <li key={name}>
          <a href
          ={href}>{name}</a>
        </li>
      ))}
    </ul>
  )
}