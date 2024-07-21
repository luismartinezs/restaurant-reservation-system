const links = [
  {
    name: 'Home',
    href: '/'
  },
  {
    name: 'Restaurants List',
    href: '/scaffold/restaurants/list'
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