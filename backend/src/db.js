// This file connect to the remote prismadb and gives us the ability to query with javascript - neat! 

// require is standard on node-js
const { Prisma } = require('prisma-binding')

// db connection to Prisma
const db = new Prisma({
  typeDefs: 'src/generated/prisma.graphql',
  endpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
  debug: false
})

module.exports = db