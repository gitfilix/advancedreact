// entry point of application - let's go!
require('dotenv').config({ path: 'variables.env'})
const createServer = require('createServer')
const db = require('./db')

const server = createServer()


// TODO Use express middleware to handle cookies
// TODO Use express middleware to handle cookies
