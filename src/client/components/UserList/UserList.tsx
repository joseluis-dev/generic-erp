import { currentOrganizationQuery } from '#graphQLClient/organization.gql'
import { myUsersWithRol } from '#graphQLClient/user.gql'
import { useQueryOrganization } from '#hooks/useOrganization'
import { useQueryUser } from '#hooks/useUser'
import React from 'react'
import User from './User'
import styles from '#styles/components/UserList/User.module.css'

const UserList = (): JSX.Element => {
  const { data: org } = useQueryOrganization({ query: currentOrganizationQuery })
  const { data: users, isLoading, mutate: setUserList } = useQueryUser({ query: org != null ? myUsersWithRol : '', variables: { orgID: org?.myOrganization.id } })

  return (
    <div className={styles.container}>
      <legend>Usuarios</legend>
      <hr />
        <ul>
          {!isLoading && Boolean(users)
            ? users.myUsersWithRol.map(
              (user: any) =>
                <User key={user.user.id} user={user} setUserList={setUserList} />
            )
            // TODO BETTER LOADING..
            : <div>Loading...</div>
          }
        </ul>
    </div>
  )
}

export default UserList
