import React, { useEffect } from 'react'
import ClientList from '#components/ClientList/ClientList'
import PageTemplate from '#components/PageTemplate/PageTemplate'
import styles from '#styles/pages/home/clients.module.css'
import MyButton from '#components/Buttons/MyButton'
import { useMutationUser } from '#hooks/useUser'
import { useRouter } from 'next/router'
import { useQueryPayment } from '#hooks/usePayment'
import { hasUserPayment } from '#graphQLClient/payment.gql'

const Clients = (): JSX.Element => {
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
    <PageTemplate title='Clients' navBar controlBar>
      <main className={styles.main}>
        <MyButton href='/home/client/new' type='primary'>Añadir</MyButton>
        <ClientList />
      </main>
    </PageTemplate>
  )
}

export default Clients
