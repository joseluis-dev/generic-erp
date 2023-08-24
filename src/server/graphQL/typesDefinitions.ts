import { DateTimeTypeDefinition } from 'graphql-scalars'
import { userTypeDefs } from '#models/user/user.typeDefs'
import { orgTypeDefs } from '#models/organization/org.typesDefs'
import { keysTypeDefs } from '#models/keys/keys.typeDefs'
import { clientTypeDefs } from '#models/client/client.typeDefs'
import { statusTypeDefs } from '#models/status/status.typeDefs'
import { profileImageTypeDefs } from '#models/profile_image/profile_image.typeDefs'
import { productTypeDefs } from '#models/product/product.typeDefs'
import { saleTypeDefs } from '#models/sale/sale.typeDefs'
import { paymentDefTypes } from '#models/payment/payment.typeDefs'
import { providerDefTypes } from '#models/provider/provider.typeDefs'
import { inventoryDefTypes } from '#models/inventory/inventory.typeDefs'
import { purchaseDefTypes } from '#models/purchase/purchase.typeDefs'

export const typeDefs = /* GraphQL */ `
  ${DateTimeTypeDefinition}
  ${userTypeDefs}
  ${orgTypeDefs}
  ${keysTypeDefs}
  ${clientTypeDefs}
  ${statusTypeDefs}
  ${profileImageTypeDefs}
  ${productTypeDefs}
  ${saleTypeDefs}
  ${paymentDefTypes}
  ${providerDefTypes}
  ${inventoryDefTypes}
  ${purchaseDefTypes}
`
