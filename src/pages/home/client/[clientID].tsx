import ClientDetailInfo from '#components/ClientDetail/ClientDetailInfo'
import PageTemplate from '#components/PageTemplate/PageTemplate'
import { hasUserPayment } from '#graphQLClient/payment.gql'
import { useQueryPayment } from '#hooks/usePayment'
import { useMutationUser } from '#hooks/useUser'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const ClientDetail = (): JSX.Element => {
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
    <PageTemplate title='Client' controlBar navBar>
      <main>
        <ClientDetailInfo />
      </main>
    </PageTemplate>
  )
}

export default ClientDetail
