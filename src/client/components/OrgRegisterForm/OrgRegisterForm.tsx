import MyButton from '#components/Buttons/MyButton'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import { addOrganization } from '#graphQLClient/organization.gql'
import { useMutationOrganization } from '#hooks/useOrganization'
import { getAuth } from '#services/getJWT'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import styles from '#styles/components/OrgRegisterForm/OrgRegisterForm.module.css'

interface FormValues {
  name: string
  brand_name: string
  identifier: string
  telephone: string
  email: string
  address: string
}

const OrgRegisterForm = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()
  const { data, error, isMutating, trigger: addOrg } = useMutationOrganization()
  const router = useRouter()

  useEffect(() => {
    if (isMutating) return
    if (data != null) router.push('/').catch(err => { console.log(err) })
  }, [router, isMutating, data])

  const headers = {
    authorization: getAuth()
  }

  const onSubmit: SubmitHandler<FormValues> = (values): void => {
    addOrg({ query: addOrganization, headers, variables: values }).catch(err => { console.log(err) })
  }

  return (
    <div className={styles.container}>
      <legend>Registro de Compañía</legend>
      <hr />
      <MessageHandler error={error}/>
      <form onSubmit={handleSubmit(onSubmit)}>

        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id='name'
          placeholder='Enter your business name'
          {...register('name', {
            required: 'Required Field!'
          })}
        />
        {(errors.name != null) && <small>{errors.name.message}</small>}

        <label htmlFor="brand_name">Nombre Comercial</label>
        <input
          type="text"
          id='brand_name'
          placeholder='Enter your brand name'
          {...register('brand_name', {
            required: 'Required Field!'
          })}
        />
        {(errors.brand_name != null) && <small>{errors.brand_name.message}</small>}

        <label htmlFor="identifier">Ruc/CI</label>
        <input
          type="text"
          id='identifier'
          placeholder='Enter your unique ID'
          {...register('identifier', {
            required: 'Required Field!'
          })}
        />
        {(errors.identifier != null) && <small>{errors.identifier.message}</small>}

        <label htmlFor="telephone">Teléfono</label>
        <input
          type="tel"
          id='telephone'
          placeholder='Enter your telephone'
          {...register('telephone', {
            required: 'Required Field!'
          })}
        />
        {(errors.telephone != null) && <small>{errors.telephone.message}</small>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id='email'
          placeholder='Enter your company email'
          {...register('email', {
            required: 'Required Field!'
          })}
        />
        {(errors.email != null) && <small>{errors.email.message}</small>}

        <label htmlFor="address">Dirección</label>
        <input
          type="text"
          id='address'
          placeholder='Enter your company location'
          {...register('address', {
            required: 'Required Field!'
          })}
        />
        {(errors.address != null) && <small>{errors.address.message}</small>}

        <MyButton type='primary'>Registrar</MyButton>
        <MyButton type='secondary' href='/'>Cancelar</MyButton>
      </form>
    </div>
  )
}

export default OrgRegisterForm
