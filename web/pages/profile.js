import { useAuth } from '../lib/auth'

export default () => {
  const { user } = useAuth()
  if (!user) {
    return <>Sign in to view your profile</>
  }
  return (
    <div>
      <h1>User Profile</h1>
      <dl>
        <dt>Name</dt>
        <dd>{user.name}</dd>
        <dt>Email</dt>
        <dd>{user.email}</dd>
        <dt>Image</dt>
        <dd><img src={user.image}/></dd>
        <dt>Is Moderator?</dt>
        <dd>{user.is_moderator ? 'Yes' : 'No'}</dd>
      </dl>
    </div>
  )
}
