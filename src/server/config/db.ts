import { PrismaClient } from '@prisma/client'

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class PrismaService extends PrismaClient {
  private static instance: PrismaService

  private constructor () {
    super()
  }

  public static getInstance (): PrismaService {
    if (PrismaService.instance == null) {
      PrismaService.instance = new PrismaService()
    }

    return PrismaService.instance
  }
}

export const prisma = PrismaService.getInstance()

export const testConection = (): void => {
  prisma.$connect()
    .then(() => { console.log('Base de Datos Lista') })
    .catch(e => { console.log(e) })
  prisma.$disconnect().then().catch(e => { console.log(e) })
}
