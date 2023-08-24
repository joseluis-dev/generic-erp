import { prisma } from '#config/db'
import { GraphQLError } from 'graphql'
import { type StatusCreateType } from './dto/status.create.dto'
import { type StatusUpdateType } from './dto/status.update.dto'
import { type StatusEntityType } from './entities/status.entity'

const statusModel = prisma.status

export interface StatusServiceType {
  allStatus: () => Promise<StatusEntityType>
  oneStatus: (statusCode: string) => Promise<StatusEntityType>
  addStatus: (statusCreateInput: StatusCreateType) => Promise<StatusEntityType>
  modifyStatus: (statusID: number, statusUpdateInput: StatusUpdateType) => Promise<StatusEntityType>
  deleteStatus: (statusID: number) => Promise<StatusEntityType>
}

class StatusService implements StatusServiceType {
  private static instance: StatusService
  private constructor () {}

  public static getInstance (): StatusService {
    if (StatusService.instance == null) {
      StatusService.instance = new StatusService()
    }

    return StatusService.instance
  }

  async allStatus (): Promise<any> {
    return await statusModel.findMany()
  }

  async oneStatus (statusCode: string): Promise<any> {
    return await statusModel.findUnique({
      where: { code: statusCode }
    })
  }

  async addStatus (statusCreateInput: StatusCreateType): Promise<any> {
    const existStatus = await statusModel.findUnique({
      where: { code: statusCreateInput.code }
    })
    if (existStatus != null) throw new GraphQLError('El status ya existe!')
    return await statusModel.create({
      data: { ...statusCreateInput }
    })
  }

  async modifyStatus (statusID: number, statusUpdateInput: StatusUpdateType): Promise<any> {
    const existStatus = await statusModel.findUnique({
      where: { id: statusID }
    })
    if (existStatus == null) throw new GraphQLError('El status no existe!')
    return await statusModel.update({
      data: { ...statusUpdateInput },
      where: { id: statusID }
    })
  }

  async deleteStatus (statusID: number): Promise<any> {
    const existStatus = await statusModel.findUnique({
      where: { id: statusID }
    })
    if (existStatus == null) throw new GraphQLError('El status no existe!')
    return await statusModel.delete({
      where: { id: statusID }
    })
  }
}

export const statusService = StatusService.getInstance()
