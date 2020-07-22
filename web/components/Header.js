import { useRouter } from 'next/router'
import Link from 'next/link'
import { signin, signout } from 'next-auth/client'
import { useAuth } from '../lib/auth'

function AuthSection () {
  const { user } = useAuth()
  return (
    <div>
      {
        user
          ? <>
            Signed in as{' '}
            <Link href="/profile">
              <a>{user.name}</a>
            </Link>
            <button onClick={signout}>Sign out</button>
          </>
          : <>
            Not signed in
            <button onClick={signin}>Sign in</button>
          </>
      }
      <style jsx>{`
        div {
          margin-bottom: 10px;
        }
        button {
          display: inline-block;
          margin-left: 10px;
        }
      `}</style>
    </div>
  )
}

function MenuSection () {
  const { pathname } = useRouter()
  const { user } = useAuth()
  return (
    <div>
      <Link href="/">
        <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
      <Link href="/about">
        <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
      </Link>
      {user && (
        <Link href="/profile">
          <a className={pathname === '/profile' ? 'is-active' : ''}>Profile</a>
        </Link>
      )}
      <style jsx>{`
        div {
          margin-bottom: 16px;
        }
        a {
          margin-right: 15px;
        }
        .is-active {
          text-decoration: underline
        }
      `}</style>
    </div>
  )
}

export function Header() {
  return (
    <header>
      <AuthSection/>
      <MenuSection/>
    </header>
  )
}
