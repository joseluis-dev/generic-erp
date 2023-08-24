import { prisma } from '#config/db'
import { organizationService } from '#models/organization/org.service'
import { GraphQLError } from 'graphql'
import { v4 as uuidv4 } from 'uuid'
import { type InventoryCreateType } from './dto/inventory.create.dto'
import { type InventoryUpdateType } from './dto/inventory.update.dto'
import { type InventoryEntityType } from './entities/inventory.entity'

const inventoryModel = prisma.inventory

export interface InventoryServiceType {
  oneInventory: (inventoryID?: string, productID?: string) => Promise<InventoryEntityType>
  addInventory: (orgID: string, inventoryCreateInput: InventoryCreateType, productID: string) => Promise<InventoryEntityType>
  modifyInventory: (inventoryID: string, inventoryUpdateInput: InventoryUpdateType, productID: string) => Promise<InventoryEntityType>
  deleteInventory: (inventoryID: string) => Promise<InventoryEntityType>
}

class InventoryService implements InventoryServiceType {
  private static instance: InventoryService
  private constructor () {}

  public static getInstance (): InventoryService {
    if (InventoryService.instance == null) {
      InventoryService.instance = new InventoryService()
    }

    return InventoryService.instance
  }

  async oneInventory (inventoryID?: string, productID?: string): Promise<any> {
    if (inventoryID != null) {
      return await inventoryModel.findUnique({
        where: { id: inventoryID }
      })
    }
    if (productID != null) {
      return await inventoryModel.findUnique({
        where: { productID }
      })
    }
  }

  async addInventory (orgID: string, inventoryCreateInput: InventoryCreateType, productID: string): Promise<any> {
    const existOrganzation = await organizationService.findOne(orgID)
    if (existOrganzation == null) throw new GraphQLError('La Organización no existe!')
    const existInventory = await inventoryModel.findUnique({
      where: {
        productID
      }
    })
    if (existInventory != null) throw new GraphQLError('El Inventoryo ya existe!')
    inventoryCreateInput.id = uuidv4()
    return await inventoryModel.create({
      data: {
        ...inventoryCreateInput,
        organization: { connect: { id: orgID } },
        product: { connect: { id: productID } }
      }
    })
  }

  async modifyInventory (inventoryID: string, inventoryUpdateInput: InventoryUpdateType, productID: string): Promise<any> {
    const existInventory = await inventoryModel.findUnique({
      where: { productID }
    })
    if (existInventory == null) throw new GraphQLError('El Inventoryo no existe!')
    return await inventoryModel.update({
      data: { ...inventoryUpdateInput },
      where: { id: inventoryID },
      include: {
        product: true
      }
    })
  }

  async deleteInventory (inventoryID: string): Promise<any> {
    const existInventory = await inventoryModel.findUnique({
      where: { id: inventoryID }
    })
    if (existInventory == null) throw new GraphQLError('El Inventoryo no existe!')
    return await inventoryModel.delete({
      where: { id: inventoryID }
    })
  }
}

export const inventoryService = InventoryService.getInstance()
