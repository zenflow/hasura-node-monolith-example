// TODO: learn & use 'debug' package
const DEBUG = true

const { getToken } = require('next-auth/jwt')
const { getUserByEmail } = require('../db')

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
  debug({ headers: req.headers })

  const token = await getToken({
    req,
    secret: process.env.AUTH_JWT_SECRET,
  })
  debug({ token })
  if (!token) {
    respondWithVariables(res)
    return
  }

  let user
  try {
    user = await getUserByEmail(token.email)
  } catch (error) {
    next(error)
    return
  }
  if (!user) {
    next(new Error(`User with email ${token.email} not found`))
    return
  }

  respondWithVariables(res, user)
}

function respondWithVariables (res, user = null) {
  const response = {
    'X-Hasura-Role': user ? (user.is_moderator ? 'moderator' : 'user' ) : 'anonymous',
    'X-Hasura-User-Id': user ? String(user.id) : undefined,
    'Cache-Control': 'max-age=3', // cache for only 3 seconds because demo allows you to change roles
  }
  debug({ response })
  res.json(response)
}
