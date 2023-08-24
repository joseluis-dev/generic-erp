import { addPurchaseQuery, modifyPurchase } from '#graphQLClient/purchase.gql'
import { type ArgType, mutationFetcher } from '#services/fetcher'
import { getAuth, getOrgAuth } from '#services/getJWT'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { type SubmitHandler, type UseFormGetValues, type UseFormHandleSubmit, type UseFormRegister, type UseFormSetValue, useForm } from 'react-hook-form'
import useSWR, { type KeyedMutator } from 'swr'
import useSWRMutation, { type SWRMutationConfiguration } from 'swr/mutation'

interface UsePurchaseType {
  data: any
  error: any
  isLoading: boolean
  mutate: KeyedMutator<any>
}
interface useMutationPurchaseType {
  trigger: <SWRData = any>(extraArgument: ArgType, options?: SWRMutationConfiguration<any, any, ArgType, '/api/graphql', SWRData> | undefined) => Promise<any>
  data: any
  error: any
  isMutating: boolean
}
// interface PurchaseFormValues {
//   description: string
//   total_cost: string
//   detail1: string
//   detail2: string
//   client: string
// }
interface UsePurchaseForm {
  // hook-form
  register: UseFormRegister<any>
  handleSubmit: UseFormHandleSubmit<any>
  setValue: UseFormSetValue<any>
  getValues: UseFormGetValues<any>
  // add purchase
  purchaseCreated: any
  addPurchase: <SWRData = any>(extraArgument: ArgType, options?: SWRMutationConfiguration<any, any, ArgType, '/api/graphql', SWRData> | undefined) => Promise<any>
  isMutating: boolean
  // edit purchase
  purchaseUpdated: any
  editPurchase: (values: any) => void
  // handlers
  onSubmit: (values: any) => void
  createPurchase: (values: any) => void
  // errors
  generalError: any
  errors: any
}

export const useQueryPurchase = ({ query, variables }: { query: string | null, variables?: any }): UsePurchaseType => {
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

export const useMutationPurchase = (): useMutationPurchaseType => {
  const { trigger, data, error, isMutating } = useSWRMutation('/api/graphql', mutationFetcher)

  return {
    trigger,
    data,
    error,
    isMutating
  }
}

export const useFormPurchase = ({ purchase, closeModal, setPurchase, selectArray = [] }: { purchase?: any, closeModal?: () => void, setPurchase?: KeyedMutator<any>, selectArray?: string[] }): UsePurchaseForm => {
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<any>()
  const router = useRouter()
  const { data: purchaseCreated, error, isMutating, trigger: addPurchase } = useMutationPurchase()
  const { data: purchaseUpdated, error: updateError, isMutating: updating, trigger: updatePurchase } = useMutationPurchase()

  useEffect(() => {
    if (isMutating) return
    if (purchaseCreated != null) {
      router.push('/home/purchases').catch(err => { console.log(err) })
    }
  }, [isMutating, purchaseCreated, router])

  useEffect(() => {
    if (updating) return
    if (purchaseUpdated != null && closeModal != null && setPurchase != null) {
      setPurchase().catch(err => { console.log(err) })
      closeModal()
    }
  }, [updating, purchaseUpdated, closeModal, setPurchase])

  useEffect(() => {
    if (purchase != null) {
      setValue('description', purchase.description)
      setValue('total_cost', purchase.total_cost)
    }
  }, [purchase, setValue])

  const generalError = error != null || updateError

  const headers = {
    authorization: getAuth(),
    organization: getOrgAuth()
  }

  const createPurchase: SubmitHandler<any> = (values): void => {
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
      purchaseCreateInput: {
        description: values.description,
        total_cost: totalCostCalculated,
        detail,
        providerID: values.provider
      }
    }

    addPurchase({ query: addPurchaseQuery, headers, variables }).catch(err => { console.log(err) })
  }

  const editPurchase: SubmitHandler<any> = (values): void => {
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
      purchaseID: purchase.id,
      purchaseUpdateInput: {
        description: values.description,
        total_cost: totalCostCalculated,
        detail
      }
    }

    updatePurchase({ query: modifyPurchase, headers, variables }).catch(err => { console.log(err) })
  }

  const onSubmit = purchase != null ? editPurchase : createPurchase

  return {
    // hook-form
    register,
    handleSubmit,
    setValue,
    getValues,
    // add purchase
    purchaseCreated,
    addPurchase,
    isMutating,
    // edit purchase
    purchaseUpdated,
    editPurchase,
    // handlers
    onSubmit,
    createPurchase,
    // error
    generalError,
    errors
  }
}
