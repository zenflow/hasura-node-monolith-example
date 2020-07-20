const express = require('express')
const cookieParser = require('cookie-parser')
const routes = [
  require('./routes/next-auth'),
  require('./routes/hasura-auth-hook'),
  require('./routes/hasura-auth-query'),
]

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
routes.forEach(({ match, handle }) => {
  app.use(async (req, res, next) => {
    if (!match(req)) {
      return next()
    }
    try {
      await handle(req, res)
    } catch (error) {
      next(error)
    }
  })
})

const server = app.listen(process.env.PORT, () => {
  console.log(`Listening @ http://localhost:${process.env.PORT}`)
})

// TODO: not exiting when requested by nodemon
/* for (const signal of ['SIGINT', 'SIGTERM', 'SIGHUP', 'SIGUSR2']) {
  process.on(signal, () => {
    console.log(`Received shutdown signal '${signal}'`)
    process.exit()
  })
} */
