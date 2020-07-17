// TODO: learn & use 'debug' package
const DEBUG = false

const { getUserByAccessToken } = require('../db')

module.exports = app => {
  app.use((req, res, next) => {
    // TODO: lil abstraction for filtering control-flow based on url? (share with nextauth.js) "filterRequestHandler"?
    if (req.url !== '/hasura-auth-hook' || req.method !== 'GET') {
      next()
      return
    }
    handleHasuraAuthHook(req, res, next)
  })
}

const debug = DEBUG
  ? object => setImmediate(() => console.log('GET /hasura-auth-hook debug', JSON.stringify(object, null, 2)))
  : () => {}

async function handleHasuraAuthHook(req, res, next) {
  debug({ headers: req.headers, cookies: req.cookies })
  // TODO: http header 'Cookie' not passed through by Hasura?
  // const sessionToken = req.cookies['next-auth.session-token']
  const accessToken = req.get('access-token')
  if (!accessToken) {
    respondWithVariables(res)
    return
  }

  let user
  try {
    user = await getUserByAccessToken(accessToken)
  } catch (error) {
    next(error)
    return
  }

  if (!user) {
    res.status(401).send('Invalid access token')
    return
  }

  respondWithVariables(res, user)
}

function respondWithVariables (res, user = null) {
  const response = {
    'X-Hasura-Role': user ? (user.is_moderator ? 'moderator' : 'user' ) : 'anonymous',
    'X-Hasura-User-Id': user ? String(user.id) : undefined,
    'Cache-Control': 'no-cache', // no cache because demo allows you to change roles
  }
  debug({ response })
  res.json(response)
}
