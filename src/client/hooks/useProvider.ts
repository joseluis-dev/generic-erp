import { addProviderQuery, modifyProvider } from '#graphQLClient/provider.gql'
import { mutationFetcher, type ArgType } from '#services/fetcher'
import { getAuth, getOrgAuth } from '#services/getJWT'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { type SubmitHandler, type UseFormHandleSubmit, type UseFormRegister, type UseFormSetValue, useForm } from 'react-hook-form'
import useSWR, { type KeyedMutator } from 'swr'
import useSWRMutation, { type SWRMutationConfiguration } from 'swr/mutation'

interface UseProviderType {
  data: any
  error: any
  isLoading: boolean
  mutate: KeyedMutator<any>
}
interface useMutationProviderType {
  trigger: <SWRData = any>(extraArgument: ArgType, options?: SWRMutationConfiguration<any, any, ArgType, '/api/graphql', SWRData> | undefined) => Promise<any>
  data: any
  error: any
  isMutating: boolean
}

export const useQueryProvider = ({ query, variables }: { query: string | null, variables?: any }): UseProviderType => {
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

export const useMutationProvider = (): useMutationProviderType => {
  const { trigger, data, error, isMutating } = useSWRMutation('/api/graphql', mutationFetcher)

  return {
    trigger,
    data,
    error,
    isMutating
  }
}

interface ProviderFormValues {
  name: string
  ruc: string
  email: string
  bank_account: string
  telephone: string
  description: string
}

interface UseProviderForm {
  // hook-form
  register: UseFormRegister<ProviderFormValues>
  handleSubmit: UseFormHandleSubmit<ProviderFormValues>
  setValue: UseFormSetValue<ProviderFormValues>
  // add provider
  providerCreated: any
  addProvider: <SWRData = any>(extraArgument: ArgType, options?: SWRMutationConfiguration<any, any, ArgType, '/api/graphql', SWRData> | undefined) => Promise<any>
  isMutating: boolean
  // edit provider
  providerUpdated: any
  editProvider: (values: ProviderFormValues) => void
  // handlers
  onSubmit: (values: ProviderFormValues) => void
  createProvider: (values: ProviderFormValues) => void
  // errors
  generalError: any
  errors: any
}

export const useFormProvider = ({ provider, closeModal, setProvider }: { provider?: any, closeModal?: () => void, setProvider?: KeyedMutator<any> }): UseProviderForm => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ProviderFormValues>()
  const router = useRouter()
  const { data: providerCreated, error, isMutating, trigger: addProvider } = useMutationProvider()
  const { data: providerUpdated, error: updateError, isMutating: updating, trigger: updateProvider } = useMutationProvider()

  useEffect(() => {
    if (isMutating) return
    if (providerCreated != null) {
      router.push('/home/providers').catch(err => { console.log(err) })
    }
  }, [isMutating, providerCreated, router])

  useEffect(() => {
    if (updating) return
    if (providerUpdated != null && closeModal != null && setProvider != null) {
      setProvider().catch(err => { console.log(err) })
      closeModal()
    }
  }, [updating, providerUpdated, closeModal, setProvider])

  useEffect(() => {
    if (provider != null) {
      setValue('name', provider.name)
      setValue('ruc', provider.ruc)
      setValue('email', provider.email)
      setValue('bank_account', provider.bank_account)
      setValue('telephone', provider.telephone)
      setValue('description', provider.description)
    }
  }, [provider, setValue])

  const generalError = error != null || updateError

  const headers = {
    authorization: getAuth(),
    organization: getOrgAuth()
  }

  const createProvider: SubmitHandler<ProviderFormValues> = (values): void => {
    const variables = {
      providerCreateInput: values
    }
    addProvider({ query: addProviderQuery, headers, variables }).catch(err => { console.log(err) })
  }

  const editProvider: SubmitHandler<ProviderFormValues> = (values): void => {
    const variables = {
      providerID: provider.id,
      providerUpdateInput: values
    }

    updateProvider({ query: modifyProvider, headers, variables }).catch(err => { console.log(err) })
  }

  const onSubmit = provider != null ? editProvider : createProvider

  return {
    // hook-form
    register,
    handleSubmit,
    setValue,
    // add provider
    providerCreated,
    addProvider,
    isMutating,
    // edit provider
    providerUpdated,
    editProvider,
    // handlers
    onSubmit,
    createProvider,
    // error
    generalError,
    errors
  }
}
