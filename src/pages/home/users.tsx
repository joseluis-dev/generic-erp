import KeyGenerator from '#components/KeyGenerator/KeyGenerator'
import UserList from '#components/UserList/UserList'
import React, { useEffect } from 'react'
import styles from '#styles/pages/home/users.module.css'
import PageTemplate from '#components/PageTemplate/PageTemplate'
import { useMutationUser } from '#hooks/useUser'
import { useRouter } from 'next/router'
import { hasUserPayment } from '#graphQLClient/payment.gql'
import { useQueryPayment } from '#hooks/usePayment'

const Users = (): JSX.Element => {
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
        <KeyGenerator />
        <UserList />
      </main>
    </PageTemplate>
    </>
  )
}

export default Users
