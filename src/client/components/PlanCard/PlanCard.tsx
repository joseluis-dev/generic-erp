import React from 'react'
import PayPalMethod from '#components/PaymentMethods/PayPalMethod'
import TransferenceMethod from '#components/PaymentMethods/TransferenceMethod'
import styles from '#styles/components/PlanCard/PlanCard.module.css'
import { useQueryUser } from '#hooks/useUser'
import { userMeQuery } from '#graphQLClient/user.gql'

const PlanCard = ({ currentPlan, payMethod }: { currentPlan: any, payMethod: string }): JSX.Element => {
  const { data: user } = useQueryUser({ query: userMeQuery })

  const getIva = (): number => {
    return parseFloat(currentPlan.price) * 12 / 100
  }
  const getTotalTransference = (): number => {
    return getIva() + parseFloat(currentPlan.price)
  }

  return (
    <div className={styles.container}>
      <div>
      <h3>{currentPlan.title}</h3>
      <div className={styles.price}>
        <small>$</small>
        <h2>{currentPlan.price}</h2>
        <span>por año</span>
      </div>
      </div>
      <hr />
      <p>{currentPlan.description}</p>
      <div className={styles.detail}>
        <label className={styles.description}>Iva:</label>
        <div className={styles.values}>
          <label>12%</label>
          <label>${getIva()}</label>
        </div>
      </div>
      {payMethod === 'PayPal' && user != null &&
        <PayPalMethod user={user} currentPlan={currentPlan} getIva={getIva}/>}
      {payMethod === 'Transference' &&
        <>
        <div className={styles.total}>
          <label>Total:</label>
          <label>${getTotalTransference()}</label>
        </div>
        <TransferenceMethod />
        </>}
      </div>
  )
}

export default PlanCard
