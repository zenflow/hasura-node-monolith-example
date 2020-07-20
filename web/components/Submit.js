import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { produce } from 'immer'
import { ALL_POSTS_QUERY, allPostsQueryVars } from './PostList'

const INSERT_POST_MUTATION = gql`
  mutation ($title: String!, $url: String!) {
    insert_posts_one(object: {title: $title, url: $url}) {
      id
      title
      url
      user {
        name
      }
    }
  }
`

export default function Submit() {
  const [insertPost, { loading }] = useMutation(INSERT_POST_MUTATION)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const title = formData.get('title')
    const url = formData.get('url')
    form.reset()

    insertPost({
      variables: { title, url },
      update: (proxy, { data: { insert_posts_one } }) => {
        const data = proxy.readQuery({
          query: ALL_POSTS_QUERY,
          variables: allPostsQueryVars,
        })
        proxy.writeQuery({
          query: ALL_POSTS_QUERY,
          variables: allPostsQueryVars,
          data: produce(data, data => {
            data.posts.unshift(insert_posts_one)
            data.posts_aggregate.aggregate.count++
          }),
        })
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit</h1>
      <input placeholder="title" name="title" type="text" required />
      <input placeholder="url" name="url" type="url" required />
      <button type="submit" disabled={loading}>
        Submit
      </button>
      <style jsx>{`
        form {
          border-bottom: 1px solid #ececec;
          padding-bottom: 20px;
          margin-bottom: 20px;
        }
        h1 {
          font-size: 20px;
        }
        input {
          display: block;
          margin-bottom: 10px;
        }
      `}</style>
    </form>
  )
}
