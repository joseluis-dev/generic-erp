import { myClientsCountByPage, myClientsPaginatedQuery } from '#graphQLClient/clients.gql'
import { useQueryClient } from '#hooks/useClient'
import React, { useState } from 'react'
import Client from '#components/ClientList/Client'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import Table from '#components/Table/Table'
import styles from '#styles/components/ClientList/ClientList.module.css'

const ClientList = (): JSX.Element => {
  const [pageIndex, setPageIndex] = useState(0)
  const [items, setItems] = useState(5)
  const { data: clients, error: clientsError, isLoading } = useQueryClient({ query: myClientsPaginatedQuery, variables: { skip: items * pageIndex, take: items } })
  const { data: nextPageCount } = useQueryClient({ query: myClientsCountByPage, variables: { skip: items * (pageIndex + 1), take: items } })

  return (
    <>
    <MessageHandler error={clientsError}/>
    <div className={styles.container}>
      <legend>Lista de Clientes</legend>
      <hr />
      <div>
        <select className={styles.select} defaultValue={5} onChange={(e) => { setItems(parseInt(e.target.value)) }}>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      {!isLoading && Boolean(clients) && Boolean(nextPageCount)
        ? <Table
            data={clients.myClientsPaginated}
            nextPageCount={nextPageCount.clientCountByPage}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            RowComponent={Client}
          >
            <tr>
              <th>Nombre</th>
              <th>Email</th>
              <th>CI/Ruc</th>
              <th>Teléfono</th>
            </tr>
          </Table>
        : <div>Loading...</div>}
    </div>
    </>
  )
}

export default ClientList
