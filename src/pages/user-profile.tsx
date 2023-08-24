import OrganizationList from '#components/OrganizationList/OrganizationList'
import PageTemplate from '#components/PageTemplate/PageTemplate'
import UserForm from '#components/UserForm/UserForm'
import React from 'react'
import styles from '#styles/pages/user-profile.module.css'

const userProfile = (): JSX.Element => {
  return (
    <PageTemplate title='User-Profile' navBar>
      <div className={styles.userProfileContainer}>
        <main>
          <UserForm />
        </main>
        <aside>
          <OrganizationList />
        </aside>
      </div>
    </PageTemplate>
  )
}

export default userProfile
