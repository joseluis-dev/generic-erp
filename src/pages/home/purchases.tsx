import MyButton from '#components/Buttons/MyButton'
import PageTemplate from '#components/PageTemplate/PageTemplate'
import PurchaseList from '#components/PurchaseList/PurchaseList'
import React, { useEffect } from 'react'
import styles from '#styles/pages/home/purchase.module.css'
import { useRouter } from 'next/router'
import { useMutationUser } from '#hooks/useUser'
import { useQueryPayment } from '#hooks/usePayment'
import { hasUserPayment } from '#graphQLClient/payment.gql'

const Purchase = (): JSX.Element => {
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
    <PageTemplate title='Purchase' controlBar navBar>
      <main className={styles.main}>
        <MyButton href='/home/purchase/new' type='primary'>Añadir</MyButton>
        <PurchaseList />
      </main>
    </PageTemplate>
  )
}

export default Purchase
