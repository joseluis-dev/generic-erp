import { prisma } from '#config/db'
import { organizationService } from '#models/organization/org.service'
import { statusService } from '#models/status/status.service'
import { GraphQLError } from 'graphql'
import { v4 as uuidv4 } from 'uuid'
import { type ProductEntityType } from './entities/product.entity'
import { type ProductCreateType } from './dto/product.create.dto'
import { type ProductUpdateType } from './dto/product.update.dto'
import { type ProductFilterType } from './dto/product.filter.dto'

const productModel = prisma.product

export interface ProductServiceType {
  myProducts: (orgID: string) => Promise<ProductEntityType[]>
  oneProduct: (productID: string) => Promise<ProductEntityType>
  myProductsPaginated: (orgID: string, skip: number, take: number) => Promise<ProductEntityType[]>
  productCountByPage: (orgID: string, skip: number, take: number) => Promise<number>
  myProductsFiltered: (filter: ProductFilterType, orgID: string) => Promise<any>
  countProductsByStatus: (orgID: string, statusCode: string) => Promise<any>
  addProduct: (orgID: string, productCreateInput: ProductCreateType, invLocation?: string) => Promise<ProductEntityType>
  modifyProduct: (productID: string, productUpdateInput: ProductUpdateType, invLocation?: string) => Promise<ProductEntityType>
  deleteProduct: (productID: string) => Promise<ProductEntityType>
  modifyProductStatus: (productID: string, statusCode: string) => Promise<ProductEntityType>
}

class ProductService implements ProductServiceType {
  private static instance: ProductService
  private constructor () {}

  public static getInstance (): ProductService {
    if (ProductService.instance == null) {
      ProductService.instance = new ProductService()
    }

    return ProductService.instance
  }

  async myProducts (orgID: string): Promise<any> {
    return await productModel.findMany({
      where: { orgID },
      include: {
        status: true,
        client: true,
        inventory: true
      }
    })
  }

  async oneProduct (productID: string): Promise<any> {
    return await productModel.findUnique({
      where: { id: productID },
      include: {
        status: true,
        client: true,
        inventory: true
      }
    })
  }

  async myProductsPaginated (orgID: string, skip: number, take: number): Promise<any> {
    return await productModel.findMany({
      skip,
      take,
      where: { orgID },
      include: {
        inventory: true
      }
    })
  }

  async productCountByPage (orgID: string, skip: number, take: number): Promise<number> {
    return await productModel.count({
      skip,
      take,
      where: { orgID }
    })
  }

  async myProductsFiltered (filter: ProductFilterType, orgID: string): Promise<any> {
    let response: any = []

    const filterActions = {
      name: async () => {
        return await productModel.findMany({
          where: { orgID, name: { contains: filter.name } },
          include: {
            status: true,
            inventory: true
          }
        })
      }
    }

    if (filter.name != null) {
      response = await filterActions.name()
    }
    return response
  }

  async countProductsByStatus (orgID: string, statusCode: string): Promise<any> {
    return await productModel.count({
      where: { orgID, status: { code: statusCode } }
    })
  }

  async addProduct (orgID: string, productCreateInput: ProductCreateType, invLocation?: string): Promise<any> {
    const existOrganzation = await organizationService.findOne(orgID)
    if (existOrganzation == null) throw new GraphQLError('La Organización no existe!')
    const existProduct = await productModel.findUnique({
      where: { code: productCreateInput.code }
    })
    if (existProduct != null) throw new GraphQLError('El Producto ya existe!')
    productCreateInput.id = uuidv4()
    productCreateInput.creation_date = new Date()
    return await productModel.create({
      data: {
        ...productCreateInput,
        organization: { connect: { id: orgID } },
        status: { connect: { code: 'O' } },
        inventory: {
          create: {
            id: uuidv4(),
            cuantity: 0,
            location: invLocation != null ? invLocation : 'Sin definir',
            organization: { connect: { id: orgID } }
          }
        }
      }
    })
  }

  async modifyProduct (productID: string, productUpdateInput: ProductUpdateType, invLocation?: string): Promise<any> {
    const existProduct = await productModel.findUnique({
      where: { code: productUpdateInput.code }
    })
    if (existProduct == null) throw new GraphQLError('El Producto no existe!')
    return await productModel.update({
      data: {
        ...productUpdateInput,
        inventory: {
          update: {
            location: invLocation
          }
        }
      },
      where: { id: productID },
      include: {
        status: true,
        client: true,
        inventory: true
      }
    })
  }

  async deleteProduct (productID: string): Promise<any> {
    const existProduct = await productModel.findUnique({
      where: { id: productID }
    })
    if (existProduct == null) throw new GraphQLError('El Producto no existe!')
    return await productModel.delete({
      where: { id: productID }
    })
  }

  async modifyProductStatus (productID: string, statusCode: string): Promise<any> {
    const existProduct = await productModel.findUnique({
      where: { id: productID }
    })
    if (existProduct == null) throw new GraphQLError('El Producto no existe!')
    const existStatus = await statusService.oneStatus(statusCode)
    if (existStatus == null) throw new GraphQLError('El estado no existe!')
    return await productModel.update({
      data: { status: { connect: { code: statusCode } } },
      where: { id: productID },
      include: {
        status: true,
        client: true,
        inventory: true
      }
    })
  }
}

export const productService = ProductService.getInstance()
