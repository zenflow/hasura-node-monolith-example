import { useRouter } from 'next/router'
import Link from 'next/link'
import { signin, signout } from 'next-auth/client'
import { useAuth } from '../lib/auth'

function AuthSpan () {
  const auth = useAuth()
  return auth.user
    ? (<>
      Signed in as {auth.user.name}
      {/* session.userInfo?.is_moderator ? <em>(moderator)</em> : null */}
      <button onClick={signout}>Sign out</button>
    </>)
    : (<>
      Not signed in
      <button onClick={signin}>Sign in</button>
    </>)
}
export default function Header() {
  const { pathname } = useRouter()

  return (
    <header>
      <Link href="/">
        <a className={pathname === '/' ? 'is-active' : ''}>Home</a>
      </Link>
      <Link href="/about">
        <a className={pathname === '/about' ? 'is-active' : ''}>About</a>
      </Link>
      <AuthSpan/>
      <style jsx>{`
        header {
          margin-bottom: 25px;
        }
        a {
          font-size: 14px;
          margin-right: 15px;
          text-decoration: none;
        }
        .is-active {
          text-decoration: underline;
        }
      `}</style>
    </header>
  )
}
