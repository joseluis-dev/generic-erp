export const myProviders = /* GraphQL */`
  query myProviders {
    myProviders {
      id
      name
      ruc
      bank_account
      email
      telephone
      description
      creation_date
      update_date
      update_by
      status {
        id
        code
      }
    }
  }
`
export const myProvidersPaginated = /* GraphQL */`
  query myProvidersPaginated($skip: Int!, $take: Int!) {
    myProvidersPaginated(
      skip: $skip
      take: $take
    ) {
      id
      name
      ruc
      bank_account
      email
      telephone
      description
      creation_date
      update_date
      update_by
    }
  }
`
export const myProvider = /* GraphQL */`
  query oneProvider($providerID: String!) {
    oneProvider(
      providerID: $providerID
    ) {
      id
      name
      ruc
      bank_account
      email
      telephone
      description
      creation_date
      update_date
      update_by
      status {
        id
        code
      }
    }
  }
`
export const myProvidersFiltered = /* GraphQL */`
  query myProvidersFiltered($filter: ProviderFilter!) {
    myProvidersFiltered(
      filter: $filter
    ) {
      id
      name
      ruc
      bank_account
      email
      telephone
      description
      creation_date
      update_date
      update_by
      status {
        id
        code
      }
    }
  }
`
export const providerCountByPage = /* GraphQL */`
  query providerCountByPage($skip: Int!, $take: Int!) {
    providerCountByPage(
      skip: $skip
      take: $take
    )
  }
`
export const countProvidersByStatus = /* GraphQL */`
  query countProvidersByStatus($statusCode: String!) {
    countProvidersByStatus(
      statusCode: $statusCode
    )
  }
`
export const addProviderQuery = /* GraphQL */`
  mutation addProvider($providerCreateInput: ProviderCreateInput!) {
    addProvider(
      providerCreateInput: $providerCreateInput
    ) {
      id
      name
      ruc
      bank_account
      email
      telephone
      description
    }
  }
`
export const modifyProvider = /* GraphQL */`
  mutation modifyProvider($providerID: String!, $providerUpdateInput: ProviderUpdateInput!) {
    modifyProvider(
      providerID: $providerID
      providerUpdateInput: $providerUpdateInput
    ) {
      id
      name
      ruc
      bank_account
      email
      telephone
      description
      creation_date
      update_date
      update_by
      status {
        id
        code
      }
    }
  }
`
export const modifyProvidersStatus = /* GraphQL */`
  mutation modifyProviderStatus($providerID: String!, $statusCode: String!) {
    modifyProviderStatus(
      providerID: $providerID
      statusCode: $statusCode
    ) {
      id
      name
      ruc
      bank_account
      email
      telephone
      description
      update_date
      update_by
      status {
        id
        code
      }
    }
  }
`
export const deleteProvider = /* GraphQL */`
  mutation deleteProvider($providerID: String!) {
    deleteProvider(
      providerID: $providerID
    ) {
      id
      name
      ruc
      bank_account
      email
      telephone
      description
      update_date
      update_by
    }
  }
`
