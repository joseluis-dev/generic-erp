import MyButton from '#components/Buttons/MyButton'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import { useFormProduct } from '#hooks/useProducts'
import React from 'react'
import { type KeyedMutator } from 'swr'
import styles from '#styles/components/ProductForm/ProductForm.module.css'

interface ProductFormProps {
  product?: any
  closeModal?: () => void
  setProduct?: KeyedMutator<any>
}

const ProductForm = ({ product, closeModal, setProduct }: ProductFormProps): JSX.Element => {
  const { register, handleSubmit, errors, generalError, onSubmit } = useFormProduct({ product, closeModal, setProduct })

  return (
    <section>
      <div className={styles.container}>
        <legend>{product != null ? 'Editar Producto' : 'Añadir Producto'}</legend>
        <MessageHandler error={generalError}/>
        <form onSubmit={handleSubmit(onSubmit)}>

          <label htmlFor="code">Código</label>
          <input
            type="text"
            id='code'
            placeholder='Enter the full name'
            {...register('code', {
              required: 'Required Field!'
            })}
          />
          {(errors.code != null) && <small>{errors.code.message}</small>}

          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id='name'
            placeholder='Enter the name'
            {...register('name', {
              required: 'Required Field!'
            })}
          />
          {(errors.name != null) && <small>{errors.name.message}</small>}

          <label htmlFor="cost">Costo</label>
          <input
            type="text"
            id='cost'
            placeholder='Enter the cost'
            {...register('cost', {
              required: 'Required Field!'
            })}
          />
          {(errors.cost != null) && <small>{errors.cost.message}</small>}

          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            id='description'
            placeholder='Enter the description'
            {...register('description', {
              required: 'Required Field!'
            })}
          />
          {(errors.description != null) && <small>{errors.description.message}</small>}

          <label htmlFor="invLocation">Localización</label>
          <input
            type="text"
            id='invLocation'
            placeholder='Enter the location'
            {...register('invLocation', {
              required: 'Required Field!'
            })}
          />
          {(errors.invLocation != null) && <small>{errors.invLocation.message}</small>}

          {product != null && closeModal != null
            ? <>
              <MyButton type='primary'>Editar</MyButton>
              <MyButton type='secondary' onClick={(e) => {
                e.preventDefault()
                closeModal()
              }}>Cancelar</MyButton>
              </>
            : <>
              <MyButton type='primary'>Añadir</MyButton>
              <MyButton type='secondary' href='/home/products'>Cancelar</MyButton>
              </>}
        </form>
      </div>
    </section>
  )
}

export default ProductForm
