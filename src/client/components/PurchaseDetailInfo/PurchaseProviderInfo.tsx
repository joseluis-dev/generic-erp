import OptionProvider from '#components/ProvidersList/OptionProvider'
import { useQueryProvider } from '#hooks/useProvider'
import React, { useEffect, useState } from 'react'
import { type UseFormRegister, type UseFormSetValue } from 'react-hook-form'
import styles from '#styles/components/PurchaseDetailInfo/PurchaseProviderInfo.module.css'
import SearchSelect from '#components/SearchSelect/SearchSelect'
import { myProvidersFiltered, myProvidersPaginated } from '#graphQLClient/provider.gql'
import { purchaseCountByPage } from '#graphQLClient/purchase.gql'

interface PurchaseProviderInfoProps {
  setValue: UseFormSetValue<any>
  register: UseFormRegister<any>
  errors: any
  purchase: any
}

const PurchaseProviderInfo = ({ register, setValue, errors, purchase }: PurchaseProviderInfoProps): JSX.Element => {
  const [providerList, setProviderList] = useState([])
  const [pageIndex, setPageIndex] = useState(0)
  const [providerFilter, setProviderFilter] = useState<null | string>(null)
  const { data: providers } = useQueryProvider({ query: myProvidersPaginated, variables: { skip: 3 * pageIndex, take: 3 } })
  const { data: nextPageCount } = useQueryProvider({ query: purchaseCountByPage, variables: { skip: 3 * (pageIndex + 1), take: 3 } })
  const [unitState, setUnitState] = useState([{
    selected: 'Seleccione un Proveedor'
  }])
  const { data: provider } = useQueryProvider({ query: providerFilter != null ? myProvidersFiltered : null, variables: { filter: { name: providerFilter } } })

  useEffect(() => {
    if (purchase != null && providers?.myProvidersPaginated != null) {
      setUnitState([{ selected: purchase.provider.name }])
    }
  }, [purchase, providers])

  useEffect(() => {
    if (provider != null) {
      setProviderList(provider.myProvidersFiltered)
    } else if (providers != null) {
      const newList = providerList.length > 0 && pageIndex === 0 ? [].concat(providers.myProvidersPaginated) : providerList.concat(providers.myProvidersPaginated)
      setProviderList(newList)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider, providers])

  useEffect(() => {
    if (purchase != null && providerList.length > 0) {
      setValue('provider', purchase.provider.id)
    }
  }, [providerList, purchase, setValue])

  return (
    <div className={styles.container}>
      <label htmlFor="provider">Proveedor</label>
      <SearchSelect
        index={0}
        setFilter={setProviderFilter}
        unitState={unitState}
        nextPageCount={nextPageCount}
        setPage={setPageIndex}
      >
      <ul>
        {providerList.length > 0 &&
          providerList.map((provider: any) => <OptionProvider
            key={provider.id}
            provider={provider}
            index={0}
            unitState={unitState}
            setUnitState={setUnitState}
            setValue={setValue}
          />)}
      </ul>
      </SearchSelect>
      <select
        id='provider'
        placeholder='Choose a provider'
        {...register('provider', {
          required: 'Required Field!'
        })}
      >
        <option value="">Seleccione un Proveedor</option>
        {providerList.length > 0 &&
          providerList.map((provider: any) =>
          <option key={provider.id} value={provider.id}>{provider.name}</option>)}
      </select>
      {(errors.provider != null) && <small>{errors.provider.message}</small>}
    </div>
  )
}

export default PurchaseProviderInfo
