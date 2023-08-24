import { addClientQuery, modifyClient } from '#graphQLClient/clients.gql'
import { type ArgType, mutationFetcher } from '#services/fetcher'
import { getAuth, getOrgAuth } from '#services/getJWT'
import useSWR, { type KeyedMutator } from 'swr'
import useSWRMutation, { type SWRMutationConfiguration } from 'swr/mutation'
import { useForm, type SubmitHandler, type UseFormRegister, type UseFormHandleSubmit, type UseFormSetValue } from 'react-hook-form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

interface UseClientType {
  data: any
  error: any
  isLoading: boolean
  mutate: KeyedMutator<any>
}
interface useMutationClientType {
  trigger: <SWRData = any>(extraArgument: ArgType, options?: SWRMutationConfiguration<any, any, ArgType, '/api/graphql', SWRData> | undefined) => Promise<any>
  data: any
  error: any
  isMutating: boolean
}
interface ClientFormValues {
  fullName: string
  idNumber: string
  email: string
  address: string
  telephone: string
}
interface UseClientForm {
  // hook-form
  register: UseFormRegister<ClientFormValues>
  handleSubmit: UseFormHandleSubmit<ClientFormValues>
  setValue: UseFormSetValue<ClientFormValues>
  // add client
  clientCreated: any
  addClient: <SWRData = any>(extraArgument: ArgType, options?: SWRMutationConfiguration<any, any, ArgType, '/api/graphql', SWRData> | undefined) => Promise<any>
  isMutating: boolean
  // edit client
  clientUpdated: any
  editClient: (values: ClientFormValues) => void
  // handlers
  onSubmit: (values: ClientFormValues) => void
  createClient: (values: ClientFormValues) => void
  // errors
  generalError: any
  errors: any
}

export const useQueryClient = ({ query, variables }: { query: string | null, variables?: any }): UseClientType => {
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

export const useMutationClient = (): useMutationClientType => {
  const { trigger, data, error, isMutating } = useSWRMutation('/api/graphql', mutationFetcher)

  return {
    trigger,
    data,
    error,
    isMutating
  }
}

export const useFormClient = ({ client, closeModal, setClient }: { client?: any, closeModal?: () => void, setClient?: KeyedMutator<any> }): UseClientForm => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<ClientFormValues>()
  const router = useRouter()
  const { data: clientCreated, error, isMutating, trigger: addClient } = useMutationClient()
  const { data: clientUpdated, error: updateError, isMutating: updating, trigger: updateClient } = useMutationClient()

  useEffect(() => {
    if (isMutating) return
    if (clientCreated != null) {
      router.push('/home/clients').catch(err => { console.log(err) })
    }
  }, [isMutating, clientCreated, router])

  useEffect(() => {
    if (updating) return
    if (clientUpdated != null && closeModal != null && setClient != null) {
      setClient().catch(err => { console.log(err) })
      closeModal()
    }
  }, [updating, clientUpdated, closeModal, setClient])

  useEffect(() => {
    if (client != null) {
      setValue('fullName', client.fullName)
      setValue('idNumber', client.idNumber)
      setValue('email', client.email)
      setValue('address', client.address)
      setValue('telephone', client.telephone)
    }
  }, [client, setValue])

  const generalError = error != null || updateError

  const headers = {
    authorization: getAuth(),
    organization: getOrgAuth()
  }

  const createClient: SubmitHandler<ClientFormValues> = (values): void => {
    const variables = {
      clientCreateInput: values
    }
    addClient({ query: addClientQuery, headers, variables }).catch(err => { console.log(err) })
  }

  const editClient: SubmitHandler<ClientFormValues> = (values): void => {
    const variables = {
      clientID: client.id,
      clientUpdateInput: values
    }

    updateClient({ query: modifyClient, headers, variables }).catch(err => { console.log(err) })
  }

  const onSubmit = client != null ? editClient : createClient

  return {
    // hook-form
    register,
    handleSubmit,
    setValue,
    // add client
    clientCreated,
    addClient,
    isMutating,
    // edit client
    clientUpdated,
    editClient,
    // handlers
    onSubmit,
    createClient,
    // error
    generalError,
    errors
  }
}
