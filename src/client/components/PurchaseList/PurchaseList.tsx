import MessageHandler from '#components/MessageHandler/MessageHandler'
import Table from '#components/Table/Table'
import { myPurchasesPaginated, purchaseCountByPage } from '#graphQLClient/purchase.gql'
import { useQueryPurchase } from '#hooks/usePurchase'
import React, { useState } from 'react'
import Purchase from './Purchase'
import styles from '#styles/components/PurchaseList/PurchaseList.module.css'

const PurchaseList = (): JSX.Element => {
  const [pageIndex, setPageIndex] = useState(0)
  const [items, setItems] = useState(5)
  const { data: purchases, error: purchaseError, isLoading } = useQueryPurchase({ query: myPurchasesPaginated, variables: { skip: items * pageIndex, take: items } })
  const { data: nextPageCount } = useQueryPurchase({ query: purchaseCountByPage, variables: { skip: items * (pageIndex + 1), take: items } })

  return (
    <>
    <div className={styles.container}>
    <MessageHandler error={purchaseError}/>
      <legend>Lista de Compras</legend>
      <hr />
      <div>
        <select className={styles.select} defaultValue={5} onChange={(e) => { setItems(parseInt(e.target.value)) }}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      {!isLoading && Boolean(purchases) && Boolean(nextPageCount)
        ? <Table
            data={purchases.myPurchasesPaginated}
            nextPageCount={nextPageCount.purchaseCountByPage}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            RowComponent={Purchase}
          >
            <tr>
              <th>Descripción</th>
              <th>Valor Total</th>
              <th>Proveedor</th>
            </tr>
          </Table>
        : <div>Loading...</div>}
    </div>
    </>
  )
}

export default PurchaseList
