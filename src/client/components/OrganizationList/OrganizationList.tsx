import React from 'react'
import { myOrganizationQuery } from '#graphQLClient/organization.gql'
import { useQueryOrganization } from '#hooks/useOrganization'
import { useMutationUser } from '#hooks/useUser'
import Organization from '#components/OrganizationList/Organization'
import style from '#styles/components/OrganizationList/OrganizationList.module.css'
import BusinessButtons from './BusinessButtons'
import MyButton from '#components/Buttons/MyButton'

function OrganizationList (): JSX.Element {
  const { data, isLoading, mutate: setOrg } = useQueryOrganization({ query: myOrganizationQuery })
  const { isLoged } = useMutationUser()

  return (
    <div className={style.container}>
      <legend>Tus Compañías</legend>
      <hr />
      {isLoged
        ? <div className={style.organizationList}>
          <ul className={style.ul}>
            {!isLoading && Boolean(data)
              ? data.myOrganizations.map(
                (org: any) =>
                  <Organization org={org} key={org.id}/>
              )
              // TODO BETTER LOADING..
              : isLoged && <div>Loading...</div>
            }
          </ul>
          <BusinessButtons setOrg={setOrg}/>
          </div>
        : <>
            <MyButton type='secondary' href='/login'>Iniciar Sesión</MyButton>
            <p>para ver tus compañías</p>
          </>
      }
    </div>
  )
}

export default OrganizationList
