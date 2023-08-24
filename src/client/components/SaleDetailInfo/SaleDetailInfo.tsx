import MyButton from '#components/Buttons/MyButton'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import { useModal } from 'easy-modal-hook'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '#styles/components/SaleDetailInfo/SaleDetailInfo.module.css'
import { SvgClose } from '#assets/SvgClose'
import { useQuerySale } from '#hooks/useSale'
import { mySale } from '#graphQLClient/sales.qgl'
import SaleForm from '#components/SaleForm/SaleForm'
import Table from '#components/Table/Table'

const SaleDetailInfo = (): JSX.Element => {
  const router = useRouter()
  const { saleID } = router.query
  const { data: sale, error: saleError, isLoading, mutate: setSale } = useQuerySale({
    query: saleID != null ? mySale : null,
    variables: { saleID }
  })
  const { Modal, openModal, closeModal } = useModal({ closeIcon: <SvgClose /> })
  const salePorp = sale != null ? sale.oneSale : null

  return (
    <div className={styles.container}>
      <MessageHandler error={saleError}/>
      <Modal className={styles.modal}>
        <SaleForm sale={salePorp} closeModal={closeModal} setSale={setSale}/>
      </Modal>
      {!isLoading && Boolean(sale) && Boolean(sale.oneSale)
        ? <div className={styles.infoCard}>
              <legend>Venta</legend>
              <hr />
              <div className={styles.buttonsContainer}>
                <MyButton type='secondary' onClick={openModal}>Editar</MyButton>
              </div>
              <h2>{sale.oneSale.description}</h2>
              <label><div>Cliente:</div> {sale.oneSale.client.fullName}</label>
              <label><div>Fecha:</div> {sale.oneSale.client.creation_date}</label>
              <label><div>Productos:</div></label>
              <Table
                data={sale.oneSale.product}
                RowComponent={({ element }) => <tr key={element.product.id} id={element.product.id} onClick={() => {
                  router.push(`/home/product/${element.product.id as string}`).catch(err => { console.log(err) })
                }}>
                  <td>{element.product.name}</td>
                  <td>{element.cost}</td>
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
              <label><div>Valor Total:</div> {sale.oneSale.total_cost}</label>
            </div>
        : <div>Loading...</div>}
    </div>
  )
}

export default SaleDetailInfo
