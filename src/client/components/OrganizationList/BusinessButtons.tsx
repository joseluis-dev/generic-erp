import { joinUser } from '#graphQLClient/organization.gql'
import { useMutationOrganization } from '#hooks/useOrganization'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getAuth } from '#services/getJWT'
import { userMeQuery } from '#graphQLClient/user.gql'
import { useQueryUser } from '#hooks/useUser'
import { type KeyedMutator } from 'swr'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import MyButton from '#components/Buttons/MyButton'

const BusinessButtons = ({ setOrg }: { setOrg: KeyedMutator<any> }): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { data, error, trigger: userJoin, isMutating } = useMutationOrganization()
  const { data: user } = useQueryUser({ query: userMeQuery })

  useEffect(() => {
    if (isMutating) return
    if (data != null) {
      setOrg().catch(err => { console.log(err) })
    }
  }, [isMutating, data, setOrg])

  const onSubmit = (value: any): void => {
    const { me: { id: userID } } = user
    const [orgID, encodedRol] = value.key.split('.').slice(1, 3)
    let rol
    try {
      rol = window.atob(encodedRol)
    } catch (e) {
      console.error('Invalid Format Key!')
    }
    const joinUserObject = {
      key: value.key,
      relationOrgUserInput: {
        userID,
        orgID,
        rol
      }
    }
    userJoin({ query: joinUser, variables: joinUserObject, headers: { authorization: getAuth() } }).catch(err => { console.log(err.response.errors[0].message) })
    setOrg().catch(err => { console.log(err.response.errors[0].message) })
  }

  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        id='key'
        {...register('key', {
          required: 'Field required!',
          minLength: { value: 101, message: 'Key should have at least 101 characters' }
        })}
        placeholder='Enter your one use Key...'
      />
      {(errors.key != null) && <small>{errors.key.message as string}</small>}
      <MyButton type='primary'>Unirse</MyButton>
    </form>
    <MyButton type='secondary' href='/register'>Registrar</MyButton>
    <MessageHandler
      error={error}
      info={
        data != null && error == null
          ? 'User Joined Successfully'
          : undefined
      }/>
    </>
  )
}

export default BusinessButtons
