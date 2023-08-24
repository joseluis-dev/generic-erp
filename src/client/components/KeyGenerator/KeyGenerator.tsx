import MyButton from '#components/Buttons/MyButton'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import { generateUserKey } from '#graphQLClient/user.gql'
import { useMutationUser } from '#hooks/useUser'
import { getAuth, getOrgAuth } from '#services/getJWT'
import React from 'react'
import { useForm } from 'react-hook-form'
import styles from '#styles/components/KeyGenerator/KeyGenerator.module.css'

const KeyGenerator = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const { data, error, trigger: generateKey } = useMutationUser()

  const headers = {
    authorization: getAuth(),
    organization: getOrgAuth()
  }

  const onSubmit = (values: any): void => {
    const objVariables = {
      rol: values.rolToKey
    }
    generateKey({ query: generateUserKey, headers, variables: objVariables }).catch(err => { console.log(err) })
  }

  return (
    <div className={styles.keyContainer}>
      <MessageHandler error={error}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select
          id="rolToKey"
          defaultValue='Select a rol...'
          {...register('rolToKey', {
            required: 'Field Required!'
          })}
        >
          <option value="NORMAL">NORMAL</option>
          <option value="ADMIN">ADMIN</option>
        </select>
        {(errors.rolToKey != null) && <small>{errors.rolToKey.message as string}</small>}
        <MyButton type='primary'>Generar</MyButton>
      </form>
      <textarea name="generatedKey" id="generatedKey" disabled defaultValue={data != null ? data.generateKeyByOrg.key : ''} />
    </div>
  )
}

export default KeyGenerator
