import React from 'react'
import { PayPalButtons } from '@paypal/react-paypal-js'
import styles from '#styles/components/PaymentMethods/PaypalMethod.module.css'
import { useMutationPayment } from '#hooks/usePayment'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import { registerPayment } from '#graphQLClient/payment.gql'
import { getAuth } from '#services/getJWT'

const PayPalMethod = ({ currentPlan, getIva, user }: { currentPlan: any, getIva: () => number, user: any }): JSX.Element => {
  const { data: payment, error, trigger: setPayment } = useMutationPayment()

  const headers = {
    authorization: getAuth()
  }

  const getPayPalFee = (): number => {
    return parseFloat(currentPlan.price) * 6 / 100
  }
  const getTotalPayPal = (): number => {
    return getIva() + getPayPalFee() + parseFloat(currentPlan.price)
  }

  return (
    <>
    <MessageHandler
      error={error}
      info={
        payment != null
          ? `${user.me.fullName as string} your Payment was Successful`
          : null
      }
    />
    <div className={styles.detail}>
      <label className={styles.description}>Impuesto Paypal:</label>
      <div className={styles.values}>
        <label>6%</label>
        <label>${getPayPalFee()}</label>
      </div>
    </div>
    <div className={styles.total}>
      <label>Total:</label>
      <label>${getTotalPayPal()}</label>
    </div>
    <PayPalButtons
      style = {{
        layout: 'vertical',
        color: 'blue',
        shape: 'rect'
      }}
      createOrder={async (data, actions) => {
        return await actions.order.create({
          purchase_units: [
            {
              amount: {
                value: getTotalPayPal().toString()
              }
            }
          ]
        })
      }}
      onApprove={async (data, actions) => {
        const paymentCreationInput = {
          method: 'paypal',
          amount: getTotalPayPal(),
          period: 'yearly',
          description: `Transaction completed by ${user.me.fullName as string}`
        }
        const variables = {
          userID: user.me.id,
          paymentCreationInput
        }
        setPayment({ query: registerPayment, variables, headers }).catch(err => { console.log(err) })
        return await actions.order?.capture().then((details) => {
          const name = details.payer.name?.given_name
          console.log(`Transaction completed by ${name as string}`)
        })
      }}
    />
    </>
  )
}

export default PayPalMethod
