import MessageHandler from '#components/MessageHandler/MessageHandler'
import { useFormProvider } from '#hooks/useProvider'
import React from 'react'
import { type KeyedMutator } from 'swr'
import styles from '#styles/components/ProviderForm/ProviderForm.module.css'
import MyButton from '#components/Buttons/MyButton'

interface ProviderFormProps {
  provider?: any
  closeModal?: () => void
  setProvider?: KeyedMutator<any>
}

const ProviderForm = ({ provider, closeModal, setProvider }: ProviderFormProps): JSX.Element => {
  const { register, handleSubmit, errors, generalError, onSubmit } = useFormProvider({ provider, closeModal, setProvider })

  return (
    <section>
      <div className={styles.container}>
        <legend>{provider != null ? 'Editar Proveedor' : 'Añadir Proveedor'}</legend>
        <MessageHandler error={generalError}/>
        <form onSubmit={handleSubmit(onSubmit)}>

          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id='name'
            placeholder='Ingrese el nombre'
            {...register('name', {
              required: 'Required Field!'
            })}
          />
          {(errors.name != null) && <small>{errors.name.message}</small>}

          <label htmlFor="ruc">Ruc/C.I.</label>
          <input
            type="text"
            id='ruc'
            placeholder='Ingrese el ruc'
            {...register('ruc', {
              required: 'Required Field!'
            })}
          />
          {(errors.ruc != null) && <small>{errors.ruc.message}</small>}

          <label htmlFor="email">Email</label>
          <input
            type="text"
            id='email'
            placeholder='Ingrese el email'
            {...register('email', {
              required: 'Required Field!'
            })}
          />
          {(errors.email != null) && <small>{errors.email.message}</small>}

          <label htmlFor="bank_account">Cuenta de Banco</label>
          <input
            type="tel"
            id='bank_account'
            placeholder='Ingrese el número de cuenta'
            {...register('bank_account', {
              required: 'Required Field!'
            })}
          />
          {(errors.bank_account != null) && <small>{errors.bank_account.message}</small>}

          <label htmlFor="telephone">Teléfono</label>
          <input
            type="telephone"
            id='telephone'
            placeholder='Ingrese el número de teléfono'
            {...register('telephone', {
              required: 'Required Field!'
            })}
          />
          {(errors.email != null) && <small>{errors.email.message}</small>}

          <label htmlFor="description">Descripción</label>
          <input
            type="description"
            id='description'
            placeholder='Ingrese la descripción'
            {...register('description', {
              required: 'Required Field!'
            })}
          />
          {(errors.email != null) && <small>{errors.email.message}</small>}

          {provider != null && closeModal != null
            ? <>
              <MyButton type='primary'>Editar</MyButton>
              <MyButton type='secondary' onClick={(e) => {
                e.preventDefault()
                closeModal()
              }}>Cancelar</MyButton>
              </>
            : <>
              <MyButton type='primary'>Añadir</MyButton>
              <MyButton type='secondary' href='/home/providers'>Cancelar</MyButton>
              </>}
        </form>
      </div>
    </section>
  )
}

export default ProviderForm
