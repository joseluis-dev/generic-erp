import MyButton from '#components/Buttons/MyButton'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import { useModal } from 'easy-modal-hook'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '#styles/components/PurchaseDetailInfo/PurchaseDetailInfo.module.css'
import { SvgClose } from '#assets/SvgClose'
import { useQueryPurchase } from '#hooks/usePurchase'
import { myPurchase } from '#graphQLClient/purchase.gql'
import PurchaseForm from '#components/PurchaseForm/PurchaseForm'
import Table from '#components/Table/Table'

const PurchaseDetailInfo = (): JSX.Element => {
  const router = useRouter()
  const { purchaseID } = router.query
  const { data: purchase, error: purchaseError, isLoading, mutate: setPurchase } = useQueryPurchase({
    query: purchaseID != null ? myPurchase : null,
    variables: { purchaseID }
  })
  const { Modal, openModal, closeModal } = useModal({ closeIcon: <SvgClose /> })
  const purchasePorp = purchase != null ? purchase.onePurchase : null

  return (
    <div className={styles.container}>
      <MessageHandler error={purchaseError}/>
      <Modal className={styles.modal}>
        <PurchaseForm purchase={purchasePorp} closeModal={closeModal} setPurchase={setPurchase}/>
      </Modal>
      {!isLoading && Boolean(purchase) && Boolean(purchase.onePurchase)
        ? <div className={styles.infoCard}>
              <legend>Compra</legend>
              <hr />
              <div className={styles.buttonsContainer}>
                <MyButton type='secondary' onClick={openModal}>Editar</MyButton>
              </div>
              <h2>{purchase.onePurchase.description}</h2>
              <label><div>Proveedor:</div> {purchase.onePurchase.provider.name}</label>
              <label><div>Fecha:</div> {purchase.onePurchase.creation_date}</label>
              <label><div>Productos:</div></label>
              <div className={styles.listContainer}>
                <Table
                  data={purchase.onePurchase.detail}
                  RowComponent={({ element }) => <tr key={element.product.id} id={element.product.id} onClick={() => {
                    router.push(`/home/product/${element.product.id as string}`).catch(err => { console.log(err) })
                  }}>
                    <td>{element.product.name}</td>
                    <td>{element.product.cost}</td>
                    <td>{element.cuantity}</td>
                    <td>{element.product.inventory.cuantity}</td>
                    <td>{element.product.inventory.location}</td>
                  </tr>}
                >
                  <tr>
                    <th>Nombre</th>
                    <th>Costo</th>
                    <th>Cantidad</th>
                    <th>Stock</th>
                    <th>Localización</th>
                  </tr>
                </Table>
              </div>
              <label><div>Valor Total:</div> {purchase.onePurchase.total_cost}</label>
            </div>
        : <div>Loading...</div>}
    </div>
  )
}

export default PurchaseDetailInfo
