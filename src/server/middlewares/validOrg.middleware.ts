import { type OrganizationEntityType } from '#models/organization/entities/organization.entity'
import { userService } from '#models/user/user.service'

interface Response {
  hasOrganization: boolean
  hasAccess: boolean
}

export const validOrganization = async (currentOrg: any, currentUser: any, rols: string[]): Promise<Response> => {
  const { id: orgID } = currentOrg
  const { organization, id: userID } = currentUser
  const hasOrganization = organization.some((org: { organization: OrganizationEntityType }) => org.organization.id === orgID) as boolean
  const currentRoll = await userService.searchRole(userID, orgID) as string
  const hasAccess = rols.includes(currentRoll)

  return {
    hasOrganization,
    hasAccess
  }
}
