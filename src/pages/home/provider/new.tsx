import ProviderForm from '#components/ProviderForm/ProviderForm'
import PageTemplate from '#components/PageTemplate/PageTemplate'
import { useQueryPayment } from '#hooks/usePayment'
import { useMutationUser } from '#hooks/useUser'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { hasUserPayment } from '#graphQLClient/payment.gql'

const NewProvider = (): JSX.Element => {
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
    <PageTemplate title='New Provider' controlBar navBar>
      <main>
        <ProviderForm />
      </main>
    </PageTemplate>
  )
}

export default NewProvider
