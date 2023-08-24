import LoginForm from '#components/LoginForm/LoginForm'
import RegisterForm from '#components/RegisterForm/RegisterForm'
import { useMutationUser } from '#hooks/useUser'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import PageTemplate from '#components/PageTemplate/PageTemplate'
import styles from '#styles/pages/login.module.css'

function Login (): JSX.Element {
  const router = useRouter()
  const { isLoged, trigger: login, error } = useMutationUser()

  useEffect(() => {
    (async () => {
      if (!isLoged) return
      await router.push('/')
    })().catch(err => { console.error(err) })
  }, [router, isLoged])

  return (
    <PageTemplate title='Login'>
      <main className={styles.main}>
        <RegisterForm />
        <LoginForm login={login} error={error}/>
      </main>
    </PageTemplate>
  )
}

export default Login
