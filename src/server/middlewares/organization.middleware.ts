import { type OrganizationEntityType } from '#models/organization/entities/organization.entity'
import { organizationService } from '#models/organization/org.service'
import { jwtVerify } from 'jose'

export const organizationMiddleware = async (context: any): Promise<OrganizationEntityType | null> => {
  const { request: { options: { headers } } } = context
  const { organization } = headers
  if (organization?.toLocaleLowerCase().startsWith('bearer ') != null) {
    const jwt = organization.substring(7)
    const encoder = new TextEncoder()
    try {
      const { payload } = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
      )
      const currentOrg: OrganizationEntityType | null = await organizationService.findOne(payload.id as string)
      return currentOrg
    } catch (e) {
      // console.log('Organization: JWT inválido')
    }
  }
  return null
}
