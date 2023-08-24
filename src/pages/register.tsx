import React from 'react'
import OrgRegisterForm from '#components/OrgRegisterForm/OrgRegisterForm'
import PageTemplate from '#components/PageTemplate/PageTemplate'
import styles from '#styles/pages/register.module.css'

const register = (): JSX.Element => {
  return (
    <PageTemplate title='Business-Register' navBar>
      <main className={styles.main}>
        <OrgRegisterForm />
      </main>
    </PageTemplate>
  )
}

export default register
