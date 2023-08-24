import MyButton from '#components/Buttons/MyButton'
import { hasUserPayment } from '#graphQLClient/payment.gql'
import { useQueryPayment } from '#hooks/usePayment'
import { useMutationUser } from '#hooks/useUser'
import { useRouter } from 'next/router'
import React, { useState, type ReactNode, useEffect } from 'react'
import styles from '#styles/components/PricesCard/PricesCard.module.css'
import MessageHandler from '#components/MessageHandler/MessageHandler'

interface PriceCardType {
  title: string
  price: string
  children: ReactNode
}

const messages = {
  info: 'Your Plan is active',
  error: 'Login first'
}

const PricesCard = ({ title, price, children }: PriceCardType): JSX.Element => {
  const { isLoged } = useMutationUser()
  const router = useRouter()
  const { data: existUserPayment } = useQueryPayment({ query: hasUserPayment })
  const [message, setMessage] = useState<null | string>(null)
  const [error, setError] = useState<null | string>(null)
  const [signal, setSignal] = useState(false)

  const handleClick = (): void => {
    setSignal(false)
    if (existUserPayment.hasUserPayment as boolean) setMessage(messages.info)
    else if (isLoged) router.push(`/${price}`).catch(err => { console.log(err) })
    else setError(messages.error)
  }

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (error != null || message != null) {
      timer = setTimeout(() => {
        setMessage(null)
        setError(null)
      }, signal ? 100 : 6000)
    }

    return () => { clearTimeout(timer) }
  }, [error, message, signal])

  return (
    <div className={styles.container}>
      <MessageHandler
        error={error}
        info={message}
        setSignal={setSignal}
      />
      <h3>{title}</h3>
      <div className={styles.price}>
        <small>$</small>
        <h2>{price}</h2>
        <span>por año</span>
      </div>
      <hr />
      {children}
      <MyButton type='primary' onClick={handleClick}>Comprar Ahora</MyButton>
      <MyButton type='secondary' href='mailto:jl.devsolutions@gmail.com' rel='noopener noreferrer' target='_blank'>Contactar  Ventas</MyButton>
    </div>
  )
}

export default PricesCard
