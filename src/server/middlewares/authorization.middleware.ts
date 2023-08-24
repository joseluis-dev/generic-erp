import { type UserEntityType } from '#models/user/entities/user.entity'
import { userService } from '#models/user/user.service'
import { jwtVerify } from 'jose'

export const authorizationMiddleware = async (context: any): Promise<UserEntityType | null> => {
  const { request: { options: { headers } } } = context
  const { authorization } = headers
  if (authorization?.toLocaleLowerCase().startsWith('bearer ') != null) {
    const jwt = authorization.substring(7)
    const encoder = new TextEncoder()
    try {
      const { payload } = await jwtVerify(
        jwt,
        encoder.encode(process.env.JWT_PRIVATE_KEY)
      )
      const currentUser: UserEntityType | null = await userService.findOne(payload.id as string)
      return currentUser
    } catch (e) {
      // console.log('User: JWT inválido')
    }
  }
  return null
}
