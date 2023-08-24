import MyButton from '#components/Buttons/MyButton'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import ProductForm from '#components/ProductForm/ProductForm'
import { myProduct } from '#graphQLClient/product.gql'
import { useQueryProduct } from '#hooks/useProducts'
import { useModal } from 'easy-modal-hook'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '#styles/components/ProductDetailInfo/ProductDetailInfo.module.css'
import { SvgClose } from '#assets/SvgClose'

const ProductDetailInfo = (): JSX.Element => {
  const router = useRouter()
  const { productID } = router.query
  const { data: product, error: productError, isLoading, mutate: setProduct } = useQueryProduct({
    query: productID != null ? myProduct : null,
    variables: { productID }
  })
  const { Modal, openModal, closeModal } = useModal({ closeIcon: <SvgClose /> })
  const productPorp = product != null ? product.oneProduct : null
  return (
    <div className={styles.container}>
      <MessageHandler error={productError}/>
      <Modal className={styles.modal}>
        <ProductForm product={productPorp} closeModal={closeModal} setProduct={setProduct}/>
      </Modal>
      {!isLoading && Boolean(product) && Boolean(product.oneProduct)
        ? <div className={styles.infoCard}>
              <legend>Producto</legend>
              <hr />
              <div className={styles.buttonsContainer}>
                <MyButton type='secondary' onClick={openModal}>Editar</MyButton>
              </div>
              <h2>{product.oneProduct.code}</h2>
              <label><div>Nombre:</div> {product.oneProduct.name}</label>
              <label><div>Costo:</div> {product.oneProduct.cost}</label>
              <label><div>Descripción:</div> {product.oneProduct.description}</label>
              <label><div>Localización:</div> {product.oneProduct.inventory.location}</label>
              <label><div>Stock:</div> {product.oneProduct.inventory.cuantity}</label>
            </div>
        : <div>Loading...</div>}
    </div>
  )
}

export default ProductDetailInfo
