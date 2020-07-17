import { useRouter } from 'next/router'
import Link from 'next/link'
import { useSession, signin, signout } from 'next-auth/client'

function AuthSpan () {
  const [ session, loading ] = useSession()
  if (!session && loading) {
    return <>Loading...</>
  }
  return <>
    {!session && <>
      Not signed in <br/>
      <button onClick={signin}>Sign in</button>
    </>}
    {session && <>
      Signed in as {session.user.name}
      {session.userInfo.is_moderator ? <em>(moderator)</em> : null}
      <button onClick={signout}>Sign out</button>
    </>}
  </>
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
      <Link href="/client-only">
        <a className={pathname === '/client-only' ? 'is-active' : ''}>
          Client-Only
        </a>
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
