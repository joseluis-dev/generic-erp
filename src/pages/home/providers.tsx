import MyButton from '#components/Buttons/MyButton'
import PageTemplate from '#components/PageTemplate/PageTemplate'
import ProvidersList from '#components/ProvidersList/ProvidersList'
import { hasUserPayment } from '#graphQLClient/payment.gql'
import { useQueryPayment } from '#hooks/usePayment'
import { useMutationUser } from '#hooks/useUser'
import styles from '#styles/pages/home/providers.module.css'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Providers = (): JSX.Element => {
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
    <PageTemplate title='Providers' navBar controlBar>
      <main className={styles.main}>
        <MyButton href='/home/provider/new' type='primary'>Añadir</MyButton>
        <ProvidersList />
      </main>
    </PageTemplate>
  )
}

export default Providers
