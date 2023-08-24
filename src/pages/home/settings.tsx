import OrgSettingsForm from '#components/OrgSettingsForm/OrgSettingsForm'
import PageTemplate from '#components/PageTemplate/PageTemplate'
import React, { useEffect } from 'react'
import styles from '#styles/pages/home/settings.module.css'
import { useRouter } from 'next/router'
import { useMutationUser } from '#hooks/useUser'
import { useQueryPayment } from '#hooks/usePayment'
import { hasUserPayment } from '#graphQLClient/payment.gql'

const Settings = (): JSX.Element => {
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
    <PageTemplate title='Users' navBar controlBar>
      <main className={styles.main}>
        <OrgSettingsForm />
      </main>
    </PageTemplate>
    </>
  )
}

export default Settings
