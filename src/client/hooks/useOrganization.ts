import { addOrgImage, currentOrganizationQuery, modifyOrgQuery } from '#graphQLClient/organization.gql'
import { type ArgType, mutationFetcher } from '#services/fetcher'
import { getAuth, getOrgAuth, getOrgJWT } from '#services/getJWT'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR, { type KeyedMutator } from 'swr'
import useSWRMutation, { type SWRMutationConfiguration } from 'swr/mutation'

interface UseOrganizationType {
  data: any
  error: any
  isLoading: boolean
  mutate: KeyedMutator<any>
}

interface useMutationOrganizationType {
  trigger: <SWRData = any>(extraArgument: ArgType, options?: SWRMutationConfiguration<any, any, ArgType, '/api/graphql', SWRData> | undefined) => Promise<any>
  data: any
  error: any
  isMutating: boolean
  setOrg: KeyedMutator<any>
  isOrgLoged: boolean
}

interface UseOrgSettingsType {
  org: any
  isLoading: boolean
  edit: boolean
  imgPreview: string
  generalError: any
  getImgSource: (preview: string, defaultPic: string, edit: boolean, userImg: string) => string
  onSubmit: (event: any) => void
  handleEdit: (event: any) => void
  handleCancel: (event: any) => void
  onSelectFile: (event: any) => void
}

export const useQueryOrganization = ({ query }: { query: string }): UseOrganizationType => {
  const { data, error, isLoading, mutate } = useSWR(typeof window !== 'undefined'
    ? {
        query,
        headers: {
          authorization: getAuth(),
          organization: getOrgAuth()
        }
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

export const useMutationOrganization = (mapKey?: string): useMutationOrganizationType => {
  const router = useRouter()
  const { trigger, data, error, isMutating } = useSWRMutation('/api/graphql', mutationFetcher)
  const { data: isOrgLoged, mutate: setOrg } = useSWR('/isOrgLoged', () => { return Boolean(getOrgJWT()) })

  useEffect(() => {
    (async () => {
      if (isMutating) return
      if (data?.orgLogin != null) {
        window.localStorage.setItem('organization-token', data.orgLogin.jwt)
        await setOrg(true)
        await router.push('/home')
      }
    })().catch(err => { console.log(err) })
  }, [isMutating, data, setOrg, router])

  return {
    trigger,
    data,
    error,
    isMutating,
    setOrg,
    isOrgLoged: Boolean(isOrgLoged)
  }
}

export const useOrgSettings = (): UseOrgSettingsType => {
  const { data: org, error: orgError, isLoading, mutate: setOrg } = useQueryOrganization({ query: currentOrganizationQuery })
  const { data: modifiedOrg, error: modifyOrgError, trigger: modifyOrg } = useMutationOrganization()
  const { data: orgImage, error: imageError, trigger: addImage, isMutating: addingImage } = useMutationOrganization()
  const [edit, setEdit] = useState(false)
  const [imgPreview, setImgPreview] = useState('')

  useEffect(() => {
    if (addingImage) return
    if (orgImage != null || modifiedOrg != null) setOrg().catch(err => { console.log(err) })
  }, [addingImage, orgImage, setOrg, modifiedOrg])

  const headers = {
    authorization: getAuth(),
    organization: getOrgAuth()
  }

  const generalError = orgError ?? modifyOrgError ?? imageError

  const getImgSource = (preview: string, defaultPic: string, edit: boolean, orgImg: string): string => {
    if (edit) {
      if (preview !== '') return preview
      if (orgImg != null) return orgImg
      return defaultPic
    } else {
      if (orgImg != null) return orgImg
      return defaultPic
    }
  }

  const onSubmit = (values: any): void => {
    if (values.image != null) {
      const imgVariables = {
        file: values.image[0]
      }
      addImage({ query: addOrgImage, headers, variables: imgVariables }).catch(err => { console.log(err) })
      delete values.image
    }
    const objVariables = {
      updateOrgInput: values
    }
    modifyOrg({ query: modifyOrgQuery, headers, variables: objVariables }).catch(err => { console.log(err) })

    setEdit(false)
    setImgPreview('')
  }

  const handleEdit = (event: any): void => {
    event.preventDefault()
    setEdit(true)
    setImgPreview('')
  }

  const handleCancel = (event: any): void => {
    event.preventDefault()
    setEdit(false)
  }

  const onSelectFile = (event: any): void => {
    if (event.target.files != null && event.target.files.length > 0) {
      const imgUrl = URL.createObjectURL(event.target.files[0])
      setImgPreview(imgUrl)
      return
    }
    setImgPreview('')
  }

  return {
    org,
    isLoading,
    edit,
    imgPreview,
    generalError,
    getImgSource,
    onSubmit,
    handleEdit,
    handleCancel,
    onSelectFile
  }
}
