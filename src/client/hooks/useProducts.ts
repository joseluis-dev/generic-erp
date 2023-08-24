import { addProductQuery, modifyProduct } from '#graphQLClient/product.gql'
import { type ArgType, mutationFetcher } from '#services/fetcher'
import { getAuth, getOrgAuth } from '#services/getJWT'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister, type UseFormSetValue, useForm } from 'react-hook-form'
import useSWR, { type KeyedMutator } from 'swr'
import useSWRMutation, { type SWRMutationConfiguration } from 'swr/mutation'

interface UseProductType {
  data: any
  error: any
  isLoading: boolean
  mutate: KeyedMutator<any>
}
interface useMutationProductType {
  trigger: <SWRData = any>(extraArgument: ArgType, options?: SWRMutationConfiguration<any, any, ArgType, '/api/graphql', SWRData> | undefined) => Promise<any>
  data: any
  error: any
  isMutating: boolean
}

export const useQueryProduct = ({ query, variables }: { query: string | null, variables?: any }): UseProductType => {
  const { data, error, isLoading, mutate } = useSWR(typeof window !== 'undefined' && query !== null
    ? {
        query,
        headers: {
          authorization: getAuth(),
          organization: getOrgAuth()
        },
        variables
      }
    : null
  )

  return {
    data,
    error,
    isLoading,
    mutate
  }
}

export const useMutationProduct = (): useMutationProductType => {
  const { trigger, data, error, isMutating } = useSWRMutation('/api/graphql', mutationFetcher)

  return {
    trigger,
    data,
    error,
    isMutating
  }
}

interface ProductFormValues {
  code: string
  name: string
  cost: string
  description: string
  invLocation: string
}
interface UseProductForm {
  // hook-form
  register: UseFormRegister<ProductFormValues>
  handleSubmit: UseFormHandleSubmit<ProductFormValues>
  setValue: UseFormSetValue<ProductFormValues>
  // add product
  productCreated: any
  addProduct: <SWRData = any>(extraArgument: ArgType, options?: SWRMutationConfiguration<any, any, ArgType, '/api/graphql', SWRData> | undefined) => Promise<any>
  isMutating: boolean
  // edit product
  productUpdated: any
  editProduct: (values: ProductFormValues) => void
  // handlers
  onSubmit: (values: ProductFormValues) => void
  createProduct: (values: ProductFormValues) => void
  // errors
  generalError: any
  errors: any
}

export const useFormProduct = ({ product, closeModal, setProduct }: { product?: any, closeModal?: () => void, setProduct?: KeyedMutator<any> }): UseProductForm => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProductFormValues>()
  const router = useRouter()
  const { data: productCreated, error, isMutating, trigger: addProduct } = useMutationProduct()
  const { data: productUpdated, error: updateError, isMutating: updating, trigger: updateProduct } = useMutationProduct()

  useEffect(() => {
    if (isMutating) return
    if (productCreated != null) {
      router.push('/home/products').catch(err => { console.log(err) })
    }
  }, [isMutating, productCreated, router])

  useEffect(() => {
    if (updating) return
    if (productUpdated != null && closeModal != null && setProduct != null) {
      setProduct().catch(err => { console.log(err) })
      closeModal()
    }
  }, [updating, productUpdated, closeModal, setProduct])

  useEffect(() => {
    if (product != null) {
      setValue('code', product.code)
      setValue('name', product.name)
      setValue('cost', product.cost)
      setValue('description', product.description)
      setValue('invLocation', product.inventory.location)
    }
  }, [product, setValue])

  const generalError = error != null || updateError

  const headers = {
    authorization: getAuth(),
    organization: getOrgAuth()
  }

  const createProduct: SubmitHandler<ProductFormValues> = (values): void => {
    const newValues = {
      code: values.code,
      name: values.name,
      cost: parseFloat(values.cost),
      description: values.description
    }
    const variables = {
      productCreateInput: newValues,
      invLocation: values.invLocation
    }
    addProduct({ query: addProductQuery, headers, variables }).catch(err => { console.log(err) })
  }

  const editProduct: SubmitHandler<ProductFormValues> = (values): void => {
    const newValues = {
      code: values.code,
      name: values.name,
      cost: parseFloat(values.cost),
      description: values.description
    }
    const variables = {
      productID: product.id,
      productUpdateInput: newValues,
      invLocation: values.invLocation
    }
    updateProduct({ query: modifyProduct, headers, variables }).catch(err => { console.log(err) })
  }

  const onSubmit = product != null ? editProduct : createProduct

  return {
    // hook-form
    register,
    handleSubmit,
    setValue,
    // add product
    productCreated,
    addProduct,
    isMutating,
    // edit product
    productUpdated,
    editProduct,
    // handlers
    onSubmit,
    createProduct,
    // error
    generalError,
    errors
  }
}
