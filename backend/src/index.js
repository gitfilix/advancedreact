// entry point of application - let's go!
require('dotenv').config({ path: 'variables.env'})
// its not a package it is a (config-)file
const createServer = require('./createServer')
const db = require('./db')

// a version of graphql -yoga server
const server = createServer()

// TODO Use express middleware to handle cookies
// TODO Use express middleware to handle cookies

// HERE we connect to our frontend
  server.start({
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  }, deets => {
      console.log(`BackendServer is now running on port http://localhost${deets.port}`)
  }
)