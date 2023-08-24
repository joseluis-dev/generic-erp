import React, { type Dispatch } from 'react'
import styles from '#styles/components/PaymentMethods/PaymentSelection.module.css'

const PaymentSelection = ({ payMethod, setPayMethod }: { payMethod: string, setPayMethod: Dispatch<React.SetStateAction<string>> }): JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.checkContainer}>
        <input
          id='Transference'
          type="checkbox"
          defaultChecked={payMethod === 'Transference'}
          onClick={() => { setPayMethod('Transference') }} />
        <label htmlFor="Transference">Paga con Transferencia</label>
      </div>
      <div className={styles.checkContainer}>
        <input
          id='PayPal'
          type="checkbox"
          defaultChecked={payMethod === 'PayPal'}
          onClick={() => { setPayMethod('PayPal') }} />
        <label htmlFor="PayPal">Paga con PayPal</label>
      </div>
    </div>
  )
}

export default PaymentSelection
