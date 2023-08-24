import MyButton from '#components/Buttons/MyButton'
import PageTemplate from '#components/PageTemplate/PageTemplate'
import ProductList from '#components/ProductList/ProductList'
import React, { useEffect } from 'react'
import styles from '#styles/pages/home/products.module.css'
import { useRouter } from 'next/router'
import { useMutationUser } from '#hooks/useUser'
import { useQueryPayment } from '#hooks/usePayment'
import { hasUserPayment } from '#graphQLClient/payment.gql'

const Products = (): JSX.Element => {
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
    <PageTemplate title='Products' navBar controlBar>
      <main className={styles.main}>
        <MyButton href='/home/product/new' type='primary'>Añadir</MyButton>
        <ProductList />
      </main>
    </PageTemplate>
  )
}

export default Products
