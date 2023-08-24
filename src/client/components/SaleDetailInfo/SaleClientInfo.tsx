import OptionClient from '#components/ClientList/OptionClient'
import { myClientsCountByPage, myClientsFiltered, myClientsPaginatedQuery } from '#graphQLClient/clients.gql'
import { useQueryClient } from '#hooks/useClient'
import React, { useEffect, useState } from 'react'
import { type UseFormRegister, type UseFormSetValue } from 'react-hook-form'
import styles from '#styles/components/SaleDetailInfo/SaleClientInfo.module.css'
import SearchSelect from '#components/SearchSelect/SearchSelect'

interface SaleClientInfoProps {
  setValue: UseFormSetValue<any>
  register: UseFormRegister<any>
  errors: any
  sale: any
}

const SaleClientInfo = ({ register, setValue, errors, sale }: SaleClientInfoProps): JSX.Element => {
  const [clientList, setClientList] = useState([])
  const [pageIndex, setPageIndex] = useState(0)
  const [clientFilter, setClientFilter] = useState<null | string>(null)
  const { data: clients } = useQueryClient({ query: myClientsPaginatedQuery, variables: { skip: 3 * pageIndex, take: 3 } })
  const { data: nextPageCount } = useQueryClient({ query: myClientsCountByPage, variables: { skip: 3 * (pageIndex + 1), take: 3 } })
  const [unitState, setUnitState] = useState([{
    selected: 'Seleccione un cliente'
  }])
  const { data: client } = useQueryClient({ query: clientFilter != null ? myClientsFiltered : null, variables: { filter: { fullName: clientFilter } } })

  useEffect(() => {
    if (sale != null && clients?.myClientsPaginated != null) {
      setUnitState([{ selected: sale.client.fullName }])
    }
  }, [sale, clients])

  useEffect(() => {
    if (client != null) {
      setClientList(client.myClientsFiltered)
    } else if (clients != null) {
      const newList = clientList.length > 0 && pageIndex === 0 ? [].concat(clients.myClientsPaginated) : clientList.concat(clients.myClientsPaginated)
      setClientList(newList)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, clients])

  useEffect(() => {
    if (sale != null && clientList.length > 0) {
      setValue('client', sale.client.id)
    }
  }, [clientList, setValue, sale])

  return (
    <div className={styles.container}>
      <label htmlFor="client">Cliente</label>
      <SearchSelect
        index={0}
        setFilter={setClientFilter}
        unitState={unitState}
        nextPageCount={nextPageCount}
        setPage={setPageIndex}
      >
      <ul>
        {clientList.length > 0 &&
          clientList.map((client: any) => <OptionClient
            key={client.id}
            client={client}
            index={0}
            unitState={unitState}
            setUnitState={setUnitState}
            setValue={setValue}
          />)}
      </ul>
      </SearchSelect>
      <select
        id='client'
        placeholder='Choose a client'
        {...register('client', {
          required: 'Required Field!'
        })}
      >
        <option value="">Seleccione un cliente</option>
        {clientList.length > 0 &&
          clientList.map((client: any) =>
          <option key={client.id} value={client.id}>{client.fullName}</option>)}
      </select>
      {(errors.client != null) && <small>{errors.client.message}</small>}
    </div>
  )
}

export default SaleClientInfo
