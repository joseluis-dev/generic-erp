import React, { useState } from 'react'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import styles from '#styles/components/ProvidersList/ProvidersList.module.css'
import Table from '#components/Table/Table'
import { useQueryProvider } from '#hooks/useProvider'
import { myProvidersPaginated, providerCountByPage } from '#graphQLClient/provider.gql'
import Provider from './Provider'

const ProvidersList = (): JSX.Element => {
  const [pageIndex, setPageIndex] = useState(0)
  const [items, setItems] = useState(5)
  const { data: providers, error: providersError, isLoading } = useQueryProvider({ query: myProvidersPaginated, variables: { skip: items * pageIndex, take: items } })
  const { data: nextPageCount } = useQueryProvider({ query: providerCountByPage, variables: { skip: items * (pageIndex + 1), take: items } })

  return (
    <>
    <MessageHandler error={providersError}/>
    <div className={styles.container}>
      <legend>Lista de Proveedores</legend>
      <hr />
      <div>
        <select className={styles.select} defaultValue={5} onChange={(e) => { setItems(parseInt(e.target.value)) }}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      {!isLoading && Boolean(providers) && Boolean(nextPageCount)
        ? <Table
            data={providers.myProvidersPaginated}
            nextPageCount={nextPageCount.providerCountByPage}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            RowComponent={Provider}
          >
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>CI/Ruc</th>
              <th>Teléfono</th>
              <th>Descripción</th>
            </tr>
          </Table>
        : <div>Loading...</div>}
    </div>
    </>
  )
}

export default ProvidersList
