import Link from 'next/link'

const Nav = () => (
  <div>
    <Link href='/'>
      <a>index</a>
    </Link>
    <Link href='/sell'>
      <a>Sell</a>
    </Link>

  </div>
)

export default Nav