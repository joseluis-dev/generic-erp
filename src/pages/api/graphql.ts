import { createYoga, createSchema } from 'graphql-yoga'
import { typeDefs } from '#graphQL/typesDefinitions'
import { resolvers } from '#graphQL/resolvers'
import { testConection } from '#config/db'
import { authorizationMiddleware } from '#middlewares/authorization.middleware'
import { organizationMiddleware } from '#middlewares/organization.middleware'

testConection()

const schema = createSchema({
  typeDefs,
  resolvers
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  context: async (context) => {
    const currentUser = await authorizationMiddleware(context)
    const currentOrg = await organizationMiddleware(context)
    return { currentUser, currentOrg }
  }
})
