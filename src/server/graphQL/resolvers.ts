import { clientMutationResolver, clientQueryResolver } from '#models/client/client.resolver'
import { keysMutationResolver, keysQueryResolver } from '#models/keys/keys.resolver'
import { organizationQueryResolver, organizationMutationResolver } from '#models/organization/org.resolver'
import { paymentMutationResolver, paymentQueryResolver } from '#models/payment/payment.resolver'
import { productMutationResolver, productQueryResolver } from '#models/product/product.resolver'
import { profileImageMutationResolver, profileImageQueryResolver } from '#models/profile_image/profile_image.resolver'
import { providerMutationResolver, providerQueryResolver } from '#models/provider/provider.resolver'
import { purchaseMutationResolver, purchaseQueryResolver } from '#models/purchase/purchase.resolver'
import { saleMutationResolver, saleQueryResolver } from '#models/sale/sale.resolver'
import { statusMutationResolver, statusQueryResolver } from '#models/status/status.resolver'
import { userMutationResolver, userQueryResolver } from '#models/user/user.resolver'

export const resolvers = {
  Query: {
    ...userQueryResolver,
    ...organizationQueryResolver,
    ...keysQueryResolver,
    ...clientQueryResolver,
    ...statusQueryResolver,
    ...profileImageQueryResolver,
    ...productQueryResolver,
    ...saleQueryResolver,
    ...paymentQueryResolver,
    ...providerQueryResolver,
    ...purchaseQueryResolver
  },
  Mutation: {
    ...userMutationResolver,
    ...organizationMutationResolver,
    ...keysMutationResolver,
    ...clientMutationResolver,
    ...statusMutationResolver,
    ...profileImageMutationResolver,
    ...productMutationResolver,
    ...saleMutationResolver,
    ...paymentMutationResolver,
    ...providerMutationResolver,
    ...purchaseMutationResolver
  }
}
