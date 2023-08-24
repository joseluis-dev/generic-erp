import { prisma } from '#config/db'
import { organizationService } from '#models/organization/org.service'
import { GraphQLError } from 'graphql'
import { type ProviderCreateType } from './dto/provider.create.dto'
import { type ProviderFilterType } from './dto/provider.filter.dto'
import { type ProviderUpdateType } from './dto/provider.update.dto'
import { type ProviderEntityType } from './entities/provider.entity'
import { v4 as uuidv4 } from 'uuid'
import { statusService } from '#models/status/status.service'

const providerModel = prisma.provider

export interface ProviderServiceType {
  myProviders: (orgID: string) => Promise<ProviderEntityType[]>
  oneProvider: (providerID: string) => Promise<ProviderEntityType>
  myProvidersPaginated: (orgID: string, skip: number, take: number) => Promise<ProviderEntityType[]>
  providerCountByPage: (orgID: string, skip: number, take: number) => Promise<number>
  myProvidersFiltered: (filter: ProviderFilterType, orgID: string) => Promise<any>
  countProvidersByStatus: (orgID: string, statusCode: string) => Promise<any>
  addProvider: (orgID: string, providerCreateInput: ProviderCreateType) => Promise<ProviderEntityType>
  modifyProvider: (providerID: string, providerUpdateInput: ProviderUpdateType) => Promise<ProviderEntityType>
  deleteProvider: (providerID: string) => Promise<ProviderEntityType>
  modifyProviderStatus: (providerID: string, statusCode: string) => Promise<ProviderEntityType>
}

class ProviderService implements ProviderServiceType {
  private static instance: ProviderService
  private constructor () {}

  public static getInstance (): ProviderService {
    if (ProviderService.instance == null) {
      ProviderService.instance = new ProviderService()
    }

    return ProviderService.instance
  }

  async myProviders (orgID: string): Promise<any> {
    return await providerModel.findMany({
      where: { orgID },
      include: {
        status: true
      }
    })
  }

  async oneProvider (providerID: string): Promise<any> {
    return await providerModel.findUnique({
      where: { id: providerID },
      include: {
        status: true
      }
    })
  }

  async myProvidersPaginated (orgID: string, skip: number, take: number): Promise<any> {
    return await providerModel.findMany({
      skip,
      take,
      where: { orgID }
    })
  }

  async providerCountByPage (orgID: string, skip: number, take: number): Promise<number> {
    return await providerModel.count({
      skip,
      take,
      where: { orgID }
    })
  }

  async myProvidersFiltered (filter: ProviderFilterType, orgID: string): Promise<any> {
    let response: any = []

    const filterActions = {
      name: async () => {
        return await providerModel.findMany({
          where: { orgID, name: { contains: filter.name } },
          include: {
            status: true
          }
        })
      }
    }

    if (filter.name != null) {
      response = await filterActions.name()
    }
    return response
  }

  async countProvidersByStatus (orgID: string, statusCode: string): Promise<any> {
    return await providerModel.count({
      where: { orgID, status: { code: statusCode } }
    })
  }

  async addProvider (orgID: string, providerCreateInput: ProviderCreateType): Promise<any> {
    const existOrganzation = await organizationService.findOne(orgID)
    if (existOrganzation == null) throw new GraphQLError('La Organización no existe!')
    const existProvider = await providerModel.findUnique({
      where: { ruc: providerCreateInput.ruc }
    })
    if (existProvider != null) throw new GraphQLError('El Proveedor ya existe!')
    providerCreateInput.id = uuidv4()
    providerCreateInput.creation_date = new Date()
    return await providerModel.create({
      data: {
        ...providerCreateInput,
        organization: { connect: { id: orgID } },
        status: { connect: { code: 'A' } }
      }
    })
  }

  async modifyProvider (providerID: string, providerUpdateInput: ProviderUpdateType): Promise<any> {
    const existProvider = await providerModel.findUnique({
      where: { id: providerID }
    })
    if (existProvider == null) throw new GraphQLError('El Proveedor no existe!')
    providerUpdateInput.update_date = new Date()
    return await providerModel.update({
      data: { ...providerUpdateInput },
      where: { id: providerID },
      include: {
        status: true
      }
    })
  }

  async deleteProvider (providerID: string): Promise<any> {
    const existProvider = await providerModel.findUnique({
      where: { id: providerID }
    })
    if (existProvider == null) throw new GraphQLError('El Proveedor no existe!')
    return await providerModel.delete({
      where: { id: providerID }
    })
  }

  async modifyProviderStatus (providerID: string, statusCode: string): Promise<any> {
    const existProvider = await providerModel.findUnique({
      where: { id: providerID }
    })
    if (existProvider == null) throw new GraphQLError('El Proveedor no existe!')
    const existStatus = await statusService.oneStatus(statusCode)
    if (existStatus == null) throw new GraphQLError('El estado no existe!')
    return await providerModel.update({
      data: {
        update_date: new Date(),
        status: { connect: { code: statusCode } }
      },
      where: { id: providerID },
      include: {
        status: true
      }
    })
  }
}

export const providerService = ProviderService.getInstance()
