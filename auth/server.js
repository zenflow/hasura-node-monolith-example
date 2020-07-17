const express = require('express')
const cookieParser = require('cookie-parser')
const routes = require('./routes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
routes.forEach(route => route(app))

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
