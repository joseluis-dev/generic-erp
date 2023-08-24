import { request } from 'graphql-request'

export interface ArgType {
  query: string
  variables?: any
  headers?: any
}

export interface ArgsType {
  query: string
  variables?: any
  headers?: any
}

export const mutationFetcher = async (
  _: string,
  { arg }: { arg: ArgType }): Promise<any> => {
  const { query, variables, headers } = arg
  const response = await request({
    url: '/api/graphql',
    document: query,
    variables,
    requestHeaders: headers
  })
  return response
}

export const fetcher = async (args: ArgsType): Promise<any> => {
  const { query, headers, variables } = args
  const response = await request({
    url: '/api/graphql',
    document: query,
    variables,
    requestHeaders: headers
  })
  return response
}
