// entry point of application - let's go!
require('dotenv').config({ path: 'variables.env'})
// its not a package it is a (config-)file
const createServer = require('./createServer')
const db = require('./db')
// to set and manupulate cookies
const cookieParser = require('cookie-parser')

// a version of graphql -yoga server
const server = createServer()

// Cookieparser: Use express middleware to handle cookies (JWT)
server.express.use(cookieParser());

// TODO Use express middleware to handle cookies

// HERE we connect to our frontend
  server.start({
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  }, deets => {
      console.log(`BackendServer Yoga-graphQL for Filiks sick Fits is now RUNNIGN on port http://localhost${deets.port}`)
  }
)