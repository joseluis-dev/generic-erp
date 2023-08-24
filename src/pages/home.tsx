import DashBoardClients from '#components/DashBoardClients/DashBoardClients'
import DashBoardProducts from '#components/DashBoardProducts/DashBoardProducts'
import DashBoardSales from '#components/DashBoardSales/DashBoardSales'
import PageTemplate from '#components/PageTemplate/PageTemplate'
import { hasUserPayment } from '#graphQLClient/payment.gql'
import { useQueryPayment } from '#hooks/usePayment'
import { useMutationUser } from '#hooks/useUser'
import styles from '#styles/pages/home.module.css'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function Home (): JSX.Element {
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
    <>
      <PageTemplate title='Home' navBar controlBar>
        <main className={styles.main}>
          <DashBoardClients />
          <DashBoardProducts />
          <DashBoardSales />
        </main>
      </PageTemplate>
    </>
  )
}
