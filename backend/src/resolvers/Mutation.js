const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: Check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args,
        }
      },
      info
    )
    console.log('Mutation: item', item)
    return item
  },
  updateItem(parent, args, ctx, info) {
    // first take a copy of updates (with id):
    const updates = { ...args }
    // remove ID from updates - as we never what to update the id
    delete updates.id 
    // run the update method - so we have access to all the mutation methods of prisma.graphql
    return ctx.db.mutation.updateItem(
      {
        data: updates,
        where: {
          id: args.id 
        },
      }, info
    )
  },
  async deleteItem(parent, args, ctx, info) {
    const where = {id : args.id}
    // 1.find the item
    const item = await ctx.db.query.item({ where }, `{ id title}`);
    // 2. check if they own that item or hav permissions
    // TODO 
    // 3. delete it
    return ctx.db.mutation.deleteItem( {where}, info);
  },
  // user signup
  async signup(parent, args, ctx, info) {
    args.email = args.email.toLowerCase()
    // password hash with bcrypt 
    const password = await bcrypt.hash(args.password, 10 ) 
    // create user in the db: call createUser
    const user = await ctx.db.mutation.createUser(
      {
        data: {
          ...args,
          password: password,
          permissions: { set: ['USER'] }
        }
      }, info);

      // create jwt token for user
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
      // we set the jwt a a cookie on the on the reponse
      ctx.response.cookie('token', token, {
        httpOnly: true,
        maxAge: 1000 * 60 *60 * 24, // one day cookie
      })
      // fiinaly we return the user to the browser
      return user
  }
}

module.exports = Mutations