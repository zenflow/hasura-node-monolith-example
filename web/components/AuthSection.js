import { useSession } from '../lib/session'
import { signin, signout } from 'next-auth/client'

export function AuthSection () {
  const { user } = useSession()
  return (
    <div>
      {
        user
          ? <>
            Signed in as {user.name}
            <button onClick={() => signout()}>Sign out</button>
          </>
          : <>
            Not signed in
            <button onClick={() => signin('google')}>Sign in with Google</button>
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
