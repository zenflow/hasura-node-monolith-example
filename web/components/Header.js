import { useRouter } from 'next/router'
import Link from 'next/link'

export function Header () {
  const { pathname } = useRouter()
  return (
    <header>
      <h2>zenflow/hasura-node-monolith-example</h2>
      <Link href="/">
        <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
      <Link href="/about">
        <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
      </Link>
      <style jsx>{`
        div {
          margin-bottom: 16px;
        }
        a {
          margin-right: 15px;
          font-size: 1.4rem;
        }
        .is-active {
          text-decoration: underline
        }
      `}</style>
    </header>
  )
}
