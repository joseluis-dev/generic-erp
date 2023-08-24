import { type ArgType, mutationFetcher } from '#services/fetcher'
import { useEffect, useState } from 'react'
import useSWRMutation, { type SWRMutationConfiguration } from 'swr/mutation'
import useSWR, { type KeyedMutator } from 'swr'
import { getAuth, getJWT } from '#services/getJWT'
import { addUserImage, modifyUserQuery, userMeQuery } from '#graphQLClient/user.gql'

interface UseUserType {
  trigger: <SWRData = any>(extraArgument: ArgType, options?: SWRMutationConfiguration<any, any, ArgType, '/api/graphql', SWRData> | undefined) => Promise<any>
  data: any
  error: any
  isMutating: boolean
  setUser: KeyedMutator<any>
  isLoged: boolean
  queryLogin: boolean
}

interface UseQueryUserType {
  data: any
  error: any
  isLoading: boolean
  mutate: KeyedMutator<any>
}

interface OptionsType {
  query: string
  headers?: any
  variables?: any
}

interface UseUserProfileType {
  user: any
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

export const useMutationUser = (): UseUserType => {
  const { trigger, data, error, isMutating } = useSWRMutation('/api/graphql', mutationFetcher)
  const { data: loged, mutate: setUser, isLoading } = useSWR('/isLoged', () => { return Boolean(getJWT()) })

  useEffect(() => {
    (async () => {
      if (isMutating) return
      if (data?.login != null) {
        window.localStorage.setItem('security-token', data.login.jwt)
        await setUser(true)
      }
    })().catch(err => { console.log(err) })
  }, [isMutating, data, setUser])

  return {
    // Mutation
    trigger,
    data,
    error,
    isMutating,
    // SWR
    setUser,
    isLoged: Boolean(loged),
    queryLogin: isLoading
  }
}

export const useQueryUser = (options: OptionsType = {
  query: '',
  headers: null,
  variables: null
}): UseQueryUserType => {
  const { query, headers, variables } = options
  const { data, error, isLoading, mutate } = useSWR(
    query != null
      ? {
          query,
          headers: headers ?? { authorization: getAuth() },
          variables
        }
      : null
  )

  return {
    // Query
    data,
    error,
    isLoading,
    mutate
  }
}

// User Profile Page Hook
export const useUserProfile = (): UseUserProfileType => {
  const { data: user, error: userError, isLoading, mutate: setUser } = useQueryUser({ query: userMeQuery })
  const { data: modifiedUser, error: modifyUserError, trigger: modifyUser } = useMutationUser()
  const { data: userImage, error: imageError, trigger: addImage, isMutating: addingImage } = useMutationUser()
  const [edit, setEdit] = useState(false)
  const [imgPreview, setImgPreview] = useState('')

  useEffect(() => {
    if (addingImage) return
    if (userImage != null || modifiedUser != null) setUser().catch(err => { console.log(err) })
  }, [addingImage, userImage, setUser, modifiedUser])

  const headers = {
    authorization: getAuth()
  }

  const generalError = userError ?? modifyUserError ?? imageError

  const getImgSource = (preview: string, defaultPic: string, edit: boolean, userImg: string): string => {
    if (edit) {
      if (preview !== '') return preview
      if (userImg != null) return userImg
      return defaultPic
    } else {
      if (userImg != null) return userImg
      return defaultPic
    }
  }

  const onSubmit = (values: any): void => {
    if (values.image != null) {
      const imgVariables = {
        file: values.image[0]
      }
      addImage({ query: addUserImage, headers, variables: imgVariables }).catch(err => { console.log(err) })
      delete values.image
    }
    const objVariables = {
      userID: user.me.id,
      updateUserInput: values
    }
    modifyUser({ query: modifyUserQuery, headers, variables: objVariables }).catch(err => { console.log(err) })

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
    user,
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
