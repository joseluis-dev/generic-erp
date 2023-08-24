import MessageHandler from '#components/MessageHandler/MessageHandler'
import Table from '#components/Table/Table'
import { myProductsPaginatedQuery, productCountByPage } from '#graphQLClient/product.gql'
import { useQueryProduct } from '#hooks/useProducts'
import React, { useState } from 'react'
import Product from '#components/ProductList/Product'
import styles from '#styles/components/ProductList/ProductList.module.css'

const ProductList = (): JSX.Element => {
  const [pageIndex, setPageIndex] = useState(0)
  const [items, setItems] = useState(5)
  const { data: products, error: productError, isLoading } = useQueryProduct({ query: myProductsPaginatedQuery, variables: { skip: items * pageIndex, take: items } })
  const { data: nextPageCount } = useQueryProduct({ query: productCountByPage, variables: { skip: items * (pageIndex + 1), take: items } })

  return (
    <>
    <div className={styles.container}>
    <MessageHandler error={productError}/>
      <legend>Lista de Productos</legend>
      <hr />
      <div>
        <select className={styles.select} defaultValue={5} onChange={(e) => { setItems(parseInt(e.target.value)) }}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      {!isLoading && Boolean(products) && Boolean(nextPageCount)
        ? <Table
            data={products.myProductsPaginated}
            nextPageCount={nextPageCount.productCountByPage}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            RowComponent={Product}
          >
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Costo</th>
              <th>Descripción</th>
              <th>Stock</th>
              <th>Localización</th>
            </tr>
          </Table>
        : <div>Loading...</div>}
    </div>
    </>
  )
}

export default ProductList
