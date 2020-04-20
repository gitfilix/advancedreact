const { forwardTo } = require('prisma-binding');
// query RESOLVERS

const Query = {
  // forwarded directly to prisma
  items: forwardTo('db'),
  item: forwardTo('db'),
  itemsConnection: forwardTo('db'),
  // customized way
  // async items(parent, args, ctx, info) {
    // const items = await ctx.db.query.items()
    // return items;
  // }
}

module.exports = Query