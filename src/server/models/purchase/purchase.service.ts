import { prisma } from '#config/db'
import { organizationService } from '#models/organization/org.service'
import { GraphQLError } from 'graphql'
import { v4 as uuidv4 } from 'uuid'
import { type PurchaseCreateType } from './dto/purchase.create.dto'
import { type PurchaseFilterType } from './dto/purchase.filter.dto'
import { type PurchaseUpdateType } from './dto/purchase.update.dto'
import { type PurchaseEntityType } from './entities/purchase.entity'
import { statusService } from '#models/status/status.service'
import { inventoryService } from '#models/inventory/inventory.service'
import { productService } from '#models/product/product.service'

const purchaseModel = prisma.purchase
const productToPurchaseModel = prisma.producttopurchase

export interface PurchaseServiceType {
  myPurchases: (orgID: string) => Promise<PurchaseEntityType[]>
  onePurchase: (purchaseID: string) => Promise<PurchaseEntityType>
  myPurchasesPaginated: (orgID: string, skip: number, take: number) => Promise<PurchaseEntityType[]>
  purchaseCountByPage: (orgID: string, skip: number, take: number) => Promise<number>
  myPurchasesFiltered: (filter: PurchaseFilterType, orgID: string) => Promise<any>
  countPurchasesByStatus: (orgID: string, statusCode: string) => Promise<any>
  addPurchase: (orgID: string, purchaseCreateInput: PurchaseCreateType) => Promise<PurchaseEntityType>
  modifyPurchase: (purchaseID: string, purchaseUpdateInput: PurchaseUpdateType) => Promise<PurchaseEntityType>
  deletePurchase: (purchaseID: string) => Promise<PurchaseEntityType>
  modifyPurchaseStatus: (purchaseID: string, statusCode: string) => Promise<PurchaseEntityType>
}

class PurchaseService implements PurchaseServiceType {
  private static instance: PurchaseService
  private constructor () {}

  public static getInstance (): PurchaseService {
    if (PurchaseService.instance == null) {
      PurchaseService.instance = new PurchaseService()
    }

    return PurchaseService.instance
  }

  async myPurchases (orgID: string): Promise<any> {
    return await purchaseModel.findMany({
      where: { orgID },
      include: {
        status: true,
        provider: {
          select: {
            id: true,
            name: true
          }
        },
        detail: {
          select: {
            cuantity: true,
            cost: true,
            product: { include: { inventory: true } }
          }
        }
      }
    })
  }

  async onePurchase (purchaseID: string): Promise<any> {
    return await purchaseModel.findUnique({
      where: { id: purchaseID },
      include: {
        status: true,
        provider: {
          select: {
            id: true,
            name: true
          }
        },
        detail: {
          select: {
            cuantity: true,
            cost: true,
            product: { include: { inventory: true } }
          }
        }
      }
    })
  }

  async myPurchasesPaginated (orgID: string, skip: number, take: number): Promise<any> {
    return await purchaseModel.findMany({
      skip,
      take,
      where: { orgID },
      include: {
        status: true,
        provider: {
          select: {
            id: true,
            name: true
          }
        },
        detail: {
          select: {
            cuantity: true,
            cost: true,
            product: { include: { inventory: true } }
          }
        }
      }
    })
  }

  async purchaseCountByPage (orgID: string, skip: number, take: number): Promise<number> {
    return await purchaseModel.count({
      skip,
      take,
      where: { orgID }
    })
  }

  async myPurchasesFiltered (filter: PurchaseFilterType, orgID: string): Promise<any> {
    return []
  }

  async countPurchasesByStatus (orgID: string, statusCode: string): Promise<any> {
    return await purchaseModel.count({
      where: { orgID, status: { code: statusCode } }
    })
  }

  async addPurchase (orgID: string, purchaseCreateInput: PurchaseCreateType): Promise<any> {
    const { providerID, detail } = purchaseCreateInput
    const existOrganzation = await organizationService.findOne(orgID)
    if (existOrganzation == null) throw new GraphQLError('La Organización no existe!')

    purchaseCreateInput.id = uuidv4()
    purchaseCreateInput.creation_date = new Date()

    const newPurchase = {
      id: purchaseCreateInput.id,
      total_cost: purchaseCreateInput.total_cost,
      description: purchaseCreateInput.description,
      creation_date: purchaseCreateInput.creation_date
    }

    await purchaseModel.create({
      data: {
        ...newPurchase,
        organization: { connect: { id: orgID } },
        provider: { connect: { id: providerID } },
        status: { connect: { code: 'C' } }
      }
    })

    await Promise.all(
      detail.map(async product => {
        const inventory = await inventoryService.oneInventory(undefined, product.productID)

        inventory.cuantity = inventory.cuantity as number + product.cuantity
        await inventoryService.modifyInventory(inventory.id, inventory, product.productID)

        if (inventory.cuantity > 0) {
          await productService.modifyProductStatus(product.productID, 'I')
        }
        if (inventory.cuantity <= 0) {
          await productService.modifyProductStatus(product.productID, 'O')
        }

        const newProductToPurchase = {
          cuantity: product.cuantity,
          cost: product.cost
        }

        await productToPurchaseModel.create({
          data: {
            ...newProductToPurchase,
            product: { connect: { id: product.productID } },
            purchase: { connect: { id: purchaseCreateInput.id } }
          }
        })
      })
    )

    return await purchaseModel.findUnique({
      where: {
        id: purchaseCreateInput.id
      }
    })
  }

  async modifyPurchase (purchaseID: string, purchaseUpdateInput: PurchaseUpdateType): Promise<any> {
    const { detail } = purchaseUpdateInput
    const existPurchase = await purchaseModel.findUnique({
      where: { id: purchaseID }
    })
    if (existPurchase == null) throw new GraphQLError('La compra no existe!')

    purchaseUpdateInput.update_date = new Date()
    purchaseUpdateInput.update_by = ''

    if (detail != null) {
      const oldDetail = await productToPurchaseModel.findMany({
        where: { purchaseID }
      })
      await Promise.all(
        oldDetail.map(async product => {
          const inventory = await inventoryService.oneInventory(undefined, product.productID)
          inventory.cuantity = inventory.cuantity as number - product.cuantity
          await inventoryService.modifyInventory(inventory.id, inventory, product.productID)

          if (inventory.cuantity > 0) {
            await productService.modifyProductStatus(product.productID, 'I')
          }
          if (inventory.cuantity <= 0) {
            await productService.modifyProductStatus(product.productID, 'O')
          }
        })
      )
      await productToPurchaseModel.deleteMany({
        where: { purchaseID }
      })

      await Promise.all(
        detail.map(async product => {
          const inventory = await inventoryService.oneInventory(undefined, product.productID)
          inventory.cuantity = inventory.cuantity as number + product.cuantity
          await inventoryService.modifyInventory(inventory.id, inventory, product.productID)

          if (inventory.cuantity > 0) {
            await productService.modifyProductStatus(product.productID, 'I')
          }
          if (inventory.cuantity <= 0) {
            await productService.modifyProductStatus(product.productID, 'O')
          }

          const newProductToPurchase = {
            cuantity: product.cuantity,
            cost: product.cost
          }

          await productToPurchaseModel.create({
            data: {
              ...newProductToPurchase,
              product: { connect: { id: product.productID } },
              purchase: { connect: { id: purchaseID } }
            }
          })
        })
      )
    }

    return await purchaseModel.update({
      where: { id: purchaseID },
      data: {
        total_cost: purchaseUpdateInput.total_cost,
        description: purchaseUpdateInput.description,
        update_date: purchaseUpdateInput.update_date,
        update_by: purchaseUpdateInput.update_by,
        providerID: purchaseUpdateInput.providerID
      },
      include: {
        status: true,
        provider: true
      }
    })
  }

  async deletePurchase (purchaseID: string): Promise<any> {
    const existPurchase = await purchaseModel.findUnique({
      where: { id: purchaseID }
    })
    if (existPurchase == null) throw new GraphQLError('La compra no existe!')

    const oldDetail = await productToPurchaseModel.findMany({
      where: { purchaseID }
    })
    await Promise.all(
      oldDetail.map(async product => {
        const inventory = await inventoryService.oneInventory(undefined, product.productID)
        inventory.cuantity = inventory.cuantity as number - product.cuantity
        await inventoryService.modifyInventory(inventory.id, inventory, product.productID)

        if (inventory.cuantity > 0) {
          await productService.modifyProductStatus(product.productID, 'I')
        }
        if (inventory.cuantity <= 0) {
          await productService.modifyProductStatus(product.productID, 'O')
        }
      })
    )

    return await purchaseModel.delete({
      where: { id: purchaseID }
    })
  }

  async modifyPurchaseStatus (purchaseID: string, statusCode: string): Promise<any> {
    const existPurchase = await purchaseModel.findUnique({
      where: { id: purchaseID }
    })
    if (existPurchase == null) throw new GraphQLError('La compra no existe!')
    const existStatus = await statusService.oneStatus(statusCode)
    if (existStatus == null) throw new GraphQLError('El estado no existe!')

    return await purchaseModel.update({
      data: {
        update_date: new Date(),
        status: { connect: { code: statusCode } }
      },
      where: { id: purchaseID },
      include: {
        status: true,
        provider: {
          select: {
            id: true,
            name: true
          }
        },
        detail: {
          select: {
            cuantity: true,
            cost: true,
            product: { include: { inventory: true } }
          }
        }
      }
    })
  }
}

export const purchaseService = PurchaseService.getInstance()
