import MessageHandler from '#components/MessageHandler/MessageHandler'
import { mySalesPaginatedQuery, saleCountByPage } from '#graphQLClient/sales.qgl'
import { useQuerySale } from '#hooks/useSale'
import React, { useState } from 'react'
import styles from '#styles/components/SaleList/SaleList.module.css'
import Table from '#components/Table/Table'
import Sale from './Sale'

const SaleList = (): JSX.Element => {
  const [pageIndex, setPageIndex] = useState(0)
  const [items, setItems] = useState(5)
  const { data: sales, error: saleError, isLoading } = useQuerySale({ query: mySalesPaginatedQuery, variables: { skip: items * pageIndex, take: items } })
  const { data: nextPageCount } = useQuerySale({ query: saleCountByPage, variables: { skip: items * (pageIndex + 1), take: items } })

  return (
    <>
    <div className={styles.container}>
    <MessageHandler error={saleError}/>
      <legend>Lista de Ventas</legend>
      <hr />
      <div>
        <select className={styles.select} defaultValue={5} onChange={(e) => { setItems(parseInt(e.target.value)) }}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      {!isLoading && Boolean(sales) && Boolean(nextPageCount)
        ? <Table
            data={sales.mySalesPaginated}
            nextPageCount={nextPageCount.saleCountByPage}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            RowComponent={Sale}
          >
            <tr>
              <th>Descripción</th>
              <th>Valor Total</th>
              <th>Cliente</th>
            </tr>
          </Table>
        : <div>Loading...</div>}
    </div>
    </>
  )
}

export default SaleList
