import React from 'react'
import MyButton from '#components/Buttons/MyButton'
import styles from '#styles/components/PaymentMethods/TransferenceMethod.module.css'

const TransferenceMethod = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <h4>Datos de la Cuenta</h4>
      <hr />
      <div className={styles.accountInfo}>
        <div className={styles.grid}>
          <label>Nombre:</label>
          <label>Jhon Doe</label>
        </div>
        <div className={styles.grid}>
          <label>Nro. Cuenta:</label>
          <label>xxxxxxxxxx</label>
        </div>
      </div>
      <div className={styles.reportPayment}>
        <h4>Reportar Pago</h4>
        <p>Adjuntar Pago en formato jpg o png haciendo click en el botón de abajo</p>
        <small>Tiempo de validación estimado 24h</small>
        <MyButton type='primary' href="mailto:jl.devsolutions@gmail.com" rel='noopener noreferrer' target='_blank'>Reportar Pago</MyButton>
      </div>
    </div>
  )
}

export default TransferenceMethod
