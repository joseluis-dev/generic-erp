import MyButton from '#components/Buttons/MyButton'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import { useFormClient } from '#hooks/useClient'
import React from 'react'
import { type KeyedMutator } from 'swr'
import styles from '#styles/components/ClientForm/ClientForm.module.css'

interface ClientFormProps {
  client?: any
  closeModal?: () => void
  setClient?: KeyedMutator<any>
}

const ClientForm = ({ client, closeModal, setClient }: ClientFormProps): JSX.Element => {
  const { register, handleSubmit, errors, generalError, onSubmit } = useFormClient({ client, closeModal, setClient })

  return (
    <section>
      <div className={styles.container}>
        <legend>{client != null ? 'Editar Cliente' : 'Añadir Cliente'}</legend>
        <MessageHandler error={generalError}/>
        <form onSubmit={handleSubmit(onSubmit)}>

          <label htmlFor="fullName">Nombre Completo</label>
          <input
            type="text"
            id='fullName'
            placeholder='Enter the full name'
            {...register('fullName', {
              required: 'Required Field!'
            })}
          />
          {(errors.fullName != null) && <small>{errors.fullName.message}</small>}

          <label htmlFor="idNumber">Ruc/C.I.</label>
          <input
            type="text"
            id='idNumber'
            placeholder='Enter the idNumber'
            {...register('idNumber', {
              required: 'Required Field!'
            })}
          />
          {(errors.idNumber != null) && <small>{errors.idNumber.message}</small>}

          <label htmlFor="email">Email</label>
          <input
            type="text"
            id='email'
            placeholder='Enter the email'
            {...register('email', {
              required: 'Required Field!'
            })}
          />
          {(errors.email != null) && <small>{errors.email.message}</small>}

          <label htmlFor="address">Dirección</label>
          <input
            type="tel"
            id='address'
            placeholder='Enter the address'
            {...register('address', {
              required: 'Required Field!'
            })}
          />
          {(errors.address != null) && <small>{errors.address.message}</small>}

          <label htmlFor="telephone">Teléfono</label>
          <input
            type="telephone"
            id='telephone'
            placeholder='Enter the telephone number'
            {...register('telephone', {
              required: 'Required Field!'
            })}
          />
          {(errors.email != null) && <small>{errors.email.message}</small>}

          {client != null && closeModal != null
            ? <>
              <MyButton type='primary'>Editar</MyButton>
              <MyButton type='secondary' onClick={(e) => {
                e.preventDefault()
                closeModal()
              }}>Cancelar</MyButton>
              </>
            : <>
              <MyButton type='primary'>Añadir</MyButton>
              <MyButton type='secondary' href='/home/clients'>Cancelar</MyButton>
              </>}
        </form>
      </div>
    </section>
  )
}

export default ClientForm
