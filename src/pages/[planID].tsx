import PageTemplate from '#components/PageTemplate/PageTemplate'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from '#styles/pages/plan.module.css'
import PaymentSelection from '#components/PaymentMethods/PaymentSelection'
import PlanCard from '#components/PlanCard/PlanCard'

const plan300 = {
  title: 'Pequeña Empresa',
  price: '300',
  description: 'Plan de Acceso para Pequeña Empresa'
}

const plan600 = {
  title: 'Mediana Empresa',
  price: '600',
  description: 'Plan de Acceso para Mediana Empresa'
}

const plan1200 = {
  title: 'Gran Empresa',
  price: '1200',
  description: 'Plan de Acceso para Gran Empresa'
}

const Plans = {
  300: plan300,
  600: plan600,
  1200: plan1200
}

const getPlans = (planID: string | string[] | undefined): any => {
  switch (planID) {
    case '300':
      return Plans[300]
    case '600':
      return Plans[600]
    case '1200':
      return Plans[1200]
    default:
      return null
  }
}

const PlanPurchase = (): JSX.Element => {
  const [payMethod, setPayMethod] = useState('Transference')
  const router = useRouter()
  const { planID } = router.query

  const currentPlan = getPlans(planID)

  return (
    <PageTemplate title='Purchase' navBar>
      <div className={styles.pageContainer}>
        <main className={styles.main}>
          <PaymentSelection payMethod={payMethod} setPayMethod={setPayMethod} />
        {Boolean(currentPlan) &&
          <PlanCard currentPlan={currentPlan} payMethod={payMethod} />}
        </main>
      </div>
    </PageTemplate>
  )
}

export default PlanPurchase
