import { prisma } from '#config/db'
import { organizationService } from '#models/organization/org.service'
import { GraphQLError } from 'graphql'
import { type SaleCreateType } from './dto/sale.create.dto'
import { type SaleUpdateType } from './dto/sale.updatedto'
import { type SaleEntityType } from './entities/sale.entity'
import { v4 as uuidv4 } from 'uuid'
import { statusService } from '#models/status/status.service'
import { clientService } from '#models/client/client.service'
import { inventoryService } from '#models/inventory/inventory.service'
import { productService } from '#models/product/product.service'

const saleModel = prisma.sale
const productToSaleModel = prisma.producttosale

export interface SaleServiceType {
  mySales: (orgID: string) => Promise<SaleEntityType[]>
  oneSale: (saleID: string) => Promise<SaleEntityType>
  mySalesPaginated: (orgID: string, skip: number, take: number) => Promise<SaleEntityType[]>
  saleCountByPage: (orgID: string, skip: number, take: number) => Promise<number>
  mySalesByStatus: (orgID: string, statusCode: string) => Promise<any>
  mySalesByDate: (orgID: string, initDate: any, endDate: any) => Promise<any>
  addSale: (orgID: string, saleCreateInput: SaleCreateType) => Promise<SaleEntityType>
  modifySale: (saleID: string, saleUpdateInput: SaleUpdateType) => Promise<SaleEntityType>
  deleteSale: (saleID: string) => Promise<SaleEntityType>
  modifyStatusSale: (saleID: string, statusCode: string) => Promise<SaleEntityType>
}

class SaleService implements SaleServiceType {
  private static instance: SaleService
  private constructor () {}

  public static getInstance (): SaleService {
    if (SaleService.instance == null) {
      SaleService.instance = new SaleService()
    }

    return SaleService.instance
  }

  async mySales (orgID: string): Promise<any> {
    return await saleModel.findMany({
      where: { orgID },
      include: {
        organization: true,
        client: true,
        status: true,
        product: {
          select: {
            product: {
              include: { inventory: true }
            },
            cost: true,
            cuantity: true
          }
        }
      }
    })
  }

  async mySalesPaginated (orgID: string, skip: number, take: number): Promise<any> {
    return await saleModel.findMany({
      skip,
      take,
      where: { orgID },
      include: {
        client: true
      }
    })
  }

  async oneSale (saleID: string): Promise<any> {
    return await saleModel.findUnique({
      where: { id: saleID },
      include: {
        organization: true,
        client: true,
        status: true,
        product: {
          select: {
            product: {
              include: { inventory: true }
            },
            cost: true,
            cuantity: true
          }
        }
      }
    })
  }

  async saleCountByPage (orgID: string, skip: number, take: number): Promise<any> {
    return await saleModel.count({
      skip,
      take,
      where: { orgID }
    })
  }

  async mySalesByStatus (orgID: string, statusCode: string): Promise<any> {
    return await saleModel.findMany({
      where: { orgID, status: { code: statusCode } },
      include: { client: true }
    })
  }

  async mySalesByDate (orgID: string, initDate: any, endDate: any): Promise<any> {
    return await saleModel.findMany({
      where: {
        AND: [
          {
            sale_date: {
              gte: initDate
            }
          },
          {
            sale_date: {
              lte: endDate
            }
          }
        ]
      },
      include: {
        client: true
      }
    })
  }

  async addSale (orgID: string, saleCreateInput: SaleCreateType): Promise<any> {
    const { clientID, detail } = saleCreateInput
    const existClient = await clientService.oneClient(clientID)
    if (existClient == null) throw new GraphQLError('El Cliente no es válido')
    const existOrganzation = await organizationService.findOne(orgID)
    if (existOrganzation == null) throw new GraphQLError('La Organización no existe!')

    saleCreateInput.id = uuidv4()
    saleCreateInput.sale_date = new Date()

    const newSale = {
      id: saleCreateInput.id,
      description: saleCreateInput.description,
      total_cost: saleCreateInput.total_cost,
      sale_date: saleCreateInput.sale_date
    }

    await saleModel.create({
      data: {
        ...newSale,
        organization: { connect: { id: orgID } },
        client: { connect: { id: clientID } },
        status: { connect: { code: 'C' } }
      }
    })

    await Promise.all(
      detail.map(async (product) => {
        const inventory = await inventoryService.oneInventory(undefined, product.productID)

        inventory.cuantity = inventory.cuantity as number - product.cuantity
        await inventoryService.modifyInventory(inventory.id, inventory, product.productID)

        if (inventory.cuantity > 0) {
          await productService.modifyProductStatus(product.productID, 'I')
        }
        if (inventory.cuantity <= 0) {
          await productService.modifyProductStatus(product.productID, 'O')
        }

        const newProductToSale = {
          cuantity: product.cuantity,
          cost: product.cost
          // productID: product.productID,
          // saleID: saleCreateInput.id
        }
        await productToSaleModel.create({
          data: {
            ...newProductToSale,
            product: { connect: { id: product.productID } },
            sale: { connect: { id: saleCreateInput.id } }
          }
        })
      })
    )

    return await saleModel.findUnique({
      where: { id: saleCreateInput.id }
    })
  }

  async modifySale (saleID: string, saleUpdateInput: SaleUpdateType): Promise<any> {
    const { detail } = saleUpdateInput
    const existSale = await saleModel.findUnique({
      where: { id: saleID },
      include: {
        product: true
      }
    })
    if (existSale == null) throw new GraphQLError('El sale no existe!')

    if (detail != null) {
      const oldDetail = await productToSaleModel.findMany({
        where: { saleID }
      })

      await Promise.all(
        oldDetail.map(async product => {
          const inventory = await inventoryService.oneInventory(undefined, product.productID)
          inventory.cuantity = inventory.cuantity as number + product.cuantity
          await inventoryService.modifyInventory(inventory.id, inventory, product.productID)

          if (inventory.cuantity > 0) {
            await productService.modifyProductStatus(product.productID, 'I')
          }
          if (inventory.cuantity <= 0) {
            await productService.modifyProductStatus(product.productID, 'O')
          }
        })
      )

      await productToSaleModel.deleteMany({
        where: { saleID }
      })

      await Promise.all(
        detail.map(async (product) => {
          const inventory = await inventoryService.oneInventory(undefined, product.productID)
          inventory.cuantity = inventory.cuantity as number - product.cuantity
          await inventoryService.modifyInventory(inventory.id, inventory, product.productID)

          if (inventory.cuantity > 0) {
            await productService.modifyProductStatus(product.productID, 'I')
          }
          if (inventory.cuantity <= 0) {
            await productService.modifyProductStatus(product.productID, 'O')
          }

          const newProductToSale = {
            cuantity: product.cuantity,
            cost: product.cost
            // productID: product.productID,
            // saleID: saleCreateInput.id
          }
          await productToSaleModel.create({
            data: {
              ...newProductToSale,
              product: { connect: { id: product.productID } },
              sale: { connect: { id: saleID } }
            }
          })
        })
      )
    }

    delete saleUpdateInput.detail
    return await saleModel.update({
      data: { ...saleUpdateInput },
      where: { id: saleID },
      include: {
        organization: true,
        client: true,
        status: true,
        product: {
          select: {
            product: true,
            cost: true,
            cuantity: true
          }
        }
      }
    })
  }

  async deleteSale (saleID: string): Promise<any> {
    const existSale = await saleModel.findUnique({
      where: { id: saleID }
    })
    if (existSale == null) throw new GraphQLError('El sale no existe!')

    const oldDetail = await productToSaleModel.findMany({
      where: { saleID }
    })
    await Promise.all(
      oldDetail.map(async product => {
        const inventory = await inventoryService.oneInventory(undefined, product.productID)
        inventory.cuantity = inventory.cuantity as number + product.cuantity
        await inventoryService.modifyInventory(inventory.id, inventory, product.productID)

        if (inventory.cuantity > 0) {
          await productService.modifyProductStatus(product.productID, 'I')
        }
        if (inventory.cuantity <= 0) {
          await productService.modifyProductStatus(product.productID, 'O')
        }
      })
    )

    return await saleModel.delete({
      where: { id: saleID }
    })
  }

  async modifyStatusSale (saleID: string, statusCode: string): Promise<any> {
    const existSale = await saleModel.findUnique({
      where: { id: saleID }
    })
    if (existSale == null) throw new GraphQLError('El sale no existe!')
    const existStatus = await statusService.oneStatus(statusCode)
    if (existStatus == null) throw new GraphQLError('El estado no existe!')
    return await saleModel.update({
      data: { status: { connect: { code: statusCode } } },
      where: { id: saleID },
      include: {
        client: true,
        organization: true,
        status: true,
        product: {
          select: {
            product: true,
            cost: true,
            cuantity: true
          }
        }
      }
    })
  }
}

export const saleService = SaleService.getInstance()
