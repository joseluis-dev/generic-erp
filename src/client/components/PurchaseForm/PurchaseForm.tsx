import MyButton from '#components/Buttons/MyButton'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import { useFormPurchase } from '#hooks/usePurchase'
import React, { useState } from 'react'
import { type KeyedMutator } from 'swr'
import styles from '#styles/components/PurchaseForm/PurchaseForm.module.css'
import PurchaseProductInfo from '#components/PurchaseDetailInfo/PurchaseProductInfo'
import PurchaseProviderInfo from '#components/PurchaseDetailInfo/PurchaseProviderInfo'

interface PurchaseFormProps {
  purchase?: any
  closeModal?: () => void
  setPurchase?: KeyedMutator<any>
}

const PurchaseForm = ({ purchase, closeModal, setPurchase }: PurchaseFormProps): JSX.Element => {
  const [productNum, setProductNum] = useState(0)
  const [selectArray, setSelectArray] = useState([`detail${productNum}`])
  const { register, handleSubmit, errors, generalError, onSubmit, setValue, getValues } = useFormPurchase({ purchase, closeModal, setPurchase, selectArray })

  return (
    <section>
      <div className={styles.container}>
        <legend>{purchase != null ? 'Editar Compra' : 'Añadir Compra'}</legend>
        <MessageHandler error={generalError}/>
        <form onSubmit={handleSubmit(onSubmit)}>

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

          <label htmlFor="total_cost">Valor Total</label>
          <input
            type="text"
            id='total_cost'
            placeholder='Auto Calculated'
            {...register('total_cost')}
            disabled
          />
          {(errors.total_cost != null) && <small>{errors.total_cost.message}</small>}

          <PurchaseProviderInfo
            errors={errors}
            register={register}
            setValue={setValue}
            purchase={purchase}
          />

          <PurchaseProductInfo
            errors={errors}
            productNum={productNum}
            register={register}
            selectArray={selectArray}
            setProductNum={setProductNum}
            setSelectArray={setSelectArray}
            setValue={setValue}
            getValues={getValues}
            purchase={purchase}
          />

          {purchase != null && closeModal != null
            ? <>
              <MyButton type='primary'>Editar</MyButton>
              <MyButton type='secondary' onClick={(e) => {
                e.preventDefault()
                closeModal()
              }}>Cancelar</MyButton>
              </>
            : <>
              <MyButton type='primary'>Añadir</MyButton>
              <MyButton type='secondary' href='/home/purchases'>Cancelar</MyButton>
              </>}
        </form>
      </div>
    </section>
  )
}

export default PurchaseForm
