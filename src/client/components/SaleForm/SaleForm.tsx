import MyButton from '#components/Buttons/MyButton'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import { useFormSale } from '#hooks/useSale'
import React, { useState } from 'react'
import { type KeyedMutator } from 'swr'
import styles from '#styles/components/SaleForm/SaleForm.module.css'
import SaleProductInfo from '#components/SaleDetailInfo/SaleProductInfo'
import SaleClientInfo from '#components/SaleDetailInfo/SaleClientInfo'

interface SaleFormProps {
  sale?: any
  closeModal?: () => void
  setSale?: KeyedMutator<any>
}

const SaleForm = ({ sale, closeModal, setSale }: SaleFormProps): JSX.Element => {
  const [productNum, setProductNum] = useState(0)
  const [selectArray, setSelectArray] = useState([`detail${productNum}`])
  const { register, handleSubmit, errors, generalError, onSubmit, setValue, getValues } = useFormSale({ sale, closeModal, setSale, selectArray })

  return (
    <section>
      <div className={styles.container}>
        <legend>{sale != null ? 'Editar Venta' : 'Añadir Venta'}</legend>
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

          <SaleClientInfo
            errors={errors}
            register={register}
            setValue={setValue}
            sale={sale}
          />

          <SaleProductInfo
            errors={errors}
            productNum={productNum}
            register={register}
            selectArray={selectArray}
            setProductNum={setProductNum}
            setSelectArray={setSelectArray}
            setValue={setValue}
            getValues={getValues}
            sale={sale}
          />

          {sale != null && closeModal != null
            ? <>
              <MyButton type='primary'>Editar</MyButton>
              <MyButton type='secondary' onClick={(e) => {
                e.preventDefault()
                closeModal()
              }}>Cancelar</MyButton>
              </>
            : <>
              <MyButton type='primary'>Añadir</MyButton>
              <MyButton type='secondary' href='/home/sales'>Cancelar</MyButton>
              </>}
        </form>
      </div>
    </section>
  )
}

export default SaleForm
