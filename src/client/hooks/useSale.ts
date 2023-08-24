import { type ArgType, mutationFetcher } from '#services/fetcher'
import { type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister, type UseFormSetValue, useForm, type UseFormGetValues } from 'react-hook-form'
import useSWR, { type KeyedMutator } from 'swr'
import useSWRMutation, { type SWRMutationConfiguration } from 'swr/mutation'

import { getAuth, getOrgAuth } from '#services/getJWT'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { addSaleQuery, modifySale } from '#graphQLClient/sales.qgl'

interface UseSaleType {
  data: any
  error: any
  isLoading: boolean
  mutate: KeyedMutator<any>
}
interface useMutationSaleType {
  trigger: <SWRData = any>(extraArgument: ArgType, options?: SWRMutationConfiguration<any, any, ArgType, '/api/graphql', SWRData> | undefined) => Promise<any>
  data: any
  error: any
  isMutating: boolean
}
// interface SaleFormValues {
//   description: string
//   total_cost: string
//   detail1: string
//   detail2: string
//   client: string
// }
interface UseSaleForm {
  // hook-form
  register: UseFormRegister<any>
  handleSubmit: UseFormHandleSubmit<any>
  setValue: UseFormSetValue<any>
  getValues: UseFormGetValues<any>
  // add sale
  saleCreated: any
  addSale: <SWRData = any>(extraArgument: ArgType, options?: SWRMutationConfiguration<any, any, ArgType, '/api/graphql', SWRData> | undefined) => Promise<any>
  isMutating: boolean
  // edit sale
  saleUpdated: any
  editSale: (values: any) => void
  // handlers
  onSubmit: (values: any) => void
  createSale: (values: any) => void
  // errors
  generalError: any
  errors: any
}

export const useQuerySale = ({ query, variables }: { query: string | null, variables?: any }): UseSaleType => {
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

export const useMutationSale = (): useMutationSaleType => {
  const { trigger, data, error, isMutating } = useSWRMutation('/api/graphql', mutationFetcher)

  return {
    trigger,
    data,
    error,
    isMutating
  }
}

export const useFormSale = ({ sale, closeModal, setSale, selectArray = [] }: { sale?: any, closeModal?: () => void, setSale?: KeyedMutator<any>, selectArray?: string[] }): UseSaleForm => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<any>()
  const router = useRouter()
  const { data: saleCreated, error, isMutating, trigger: addSale } = useMutationSale()
  const { data: saleUpdated, error: updateError, isMutating: updating, trigger: updateSale } = useMutationSale()

  useEffect(() => {
    if (isMutating) return
    if (saleCreated != null) {
      router.push('/home/sales').catch(err => { console.log(err) })
    }
  }, [isMutating, saleCreated, router])

  useEffect(() => {
    if (updating) return
    if (saleUpdated != null && closeModal != null && setSale != null) {
      setSale().catch(err => { console.log(err) })
      closeModal()
    }
  }, [updating, saleUpdated, closeModal, setSale])

  useEffect(() => {
    if (sale != null) {
      setValue('description', sale.description)
      setValue('total_cost', sale.total_cost)
    }
  }, [sale, setValue])

  const generalError = error != null || updateError

  const headers = {
    authorization: getAuth(),
    organization: getOrgAuth()
  }

  const createSale: SubmitHandler<any> = (values): void => {
    const cuantity = selectArray.map((_, index) => {
      return `cuantity${index}`
    })
    const cost = selectArray.map((_, index) => {
      return `cost${index}`
    })
    const cuantityArray = getValues(cuantity)
    const costArray = getValues(cost)
    const detailArray = getValues(selectArray)
    let totalCostCalculated = 0
    const detail = detailArray.map((item, index) => {
      if (!isNaN(parseInt(cuantityArray[index])) && !isNaN(parseFloat(costArray[index]))) {
        totalCostCalculated += parseInt(cuantityArray[index]) * parseFloat(costArray[index])
      }
      return {
        productID: item,
        cuantity: parseInt(cuantityArray[index]),
        cost: parseFloat(costArray[index])
      }
    })
    const variables = {
      saleCreateInput: {
        description: values.description,
        total_cost: totalCostCalculated,
        detail,
        clientID: values.client
      }
    }

    addSale({ query: addSaleQuery, headers, variables }).catch(err => { console.log(err) })
  }

  const editSale: SubmitHandler<any> = (values): void => {
    const cuantity = selectArray.map((_, index) => {
      return `cuantity${index}`
    })
    const cost = selectArray.map((_, index) => {
      return `cost${index}`
    })
    const cuantityArray = getValues(cuantity)
    const costArray = getValues(cost)
    const detailArray = getValues(selectArray)
    let totalCostCalculated = 0
    const detail = detailArray.map((item, index) => {
      if (!isNaN(parseInt(cuantityArray[index])) && !isNaN(parseFloat(costArray[index]))) {
        totalCostCalculated += parseInt(cuantityArray[index]) * parseFloat(costArray[index])
      }
      return {
        productID: item,
        cuantity: parseInt(cuantityArray[index]),
        cost: parseFloat(costArray[index])
      }
    })
    const variables = {
      saleID: sale.id,
      saleUpdateInput: {
        description: values.description,
        total_cost: totalCostCalculated,
        detail
      }
    }

    updateSale({ query: modifySale, headers, variables }).catch(err => { console.log(err) })
  }

  const onSubmit = sale != null ? editSale : createSale

  return {
    // hook-form
    register,
    handleSubmit,
    setValue,
    getValues,
    // add sale
    saleCreated,
    addSale,
    isMutating,
    // edit sale
    saleUpdated,
    editSale,
    // handlers
    onSubmit,
    createSale,
    // error
    generalError,
    errors
  }
}
