import MyButton from '#components/Buttons/MyButton'
import PageTemplate from '#components/PageTemplate/PageTemplate'
import SaleList from '#components/SaleList/SaleList'
import React, { useEffect } from 'react'
import styles from '#styles/pages/home/sales.module.css'
import { useRouter } from 'next/router'
import { useMutationUser } from '#hooks/useUser'
import { useQueryPayment } from '#hooks/usePayment'
import { hasUserPayment } from '#graphQLClient/payment.gql'

const Sales = (): JSX.Element => {
  const { isLoged, queryLogin } = useMutationUser()
  const { data: existUserPayment } = useQueryPayment({ query: isLoged ? hasUserPayment : null })
  const router = useRouter()

  useEffect(() => {
    if (queryLogin) return
    if (!isLoged) router.push('/').catch(err => { console.log(err) })
  }, [isLoged, router, queryLogin])

  useEffect(() => {
    if (existUserPayment?.hasUserPayment === false) router.push('/').catch(err => { console.log(err) })
  }, [existUserPayment, router])

  return (
    <PageTemplate title='Sales' controlBar navBar>
      <main className={styles.main}>
        <MyButton href='/home/sale/new' type='primary'>Añadir</MyButton>
        <SaleList />
      </main>
    </PageTemplate>
  )
}

export default Sales
