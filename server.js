import Koa from 'koa';
import Router from 'koa-router';
import KoaStatic from 'koa-static';
import { database } from './mongodb';
import schema from './schema';
import bodyparser from 'koa-bodyparser';
import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa';

const app = new Koa();
const router = new Router();
const port = 4000;
database();
app.use(bodyparser());
router.post('/graphql', async (ctx, next) => {
  //验证jwt,在转让graphql框架
  await graphqlKoa({ schema: schema, context: { isAdmin: false } })(ctx, next);
})
  .get('/graphql', async (ctx, next) => {
    await graphqlKoa({ schema: schema })(ctx, next)
  })
  .get('/graphiql', async (ctx, next) => {
    await graphiqlKoa({ endpointURL: '/graphql' })(ctx, next)
  })

app.use(router.routes());
app.listen(port)