import React, { useEffect, useState } from 'react'
import Avatar from '#components/Avatar/Avatar'
import SesionButtons from '#components/NavBar/SesionButtons'
import { userMeQuery } from '#graphQLClient/user.gql'
import { useMutationUser, useQueryUser } from '#hooks/useUser'
// import { useForm } from 'react-hook-form'
import Logo from '#components/Logo/Logo'
import style from '#styles/components/NavBar/NavBar.module.css'
import { useQueryOrganization } from '#hooks/useOrganization'
import { currentOrganizationQuery } from '#graphQLClient/organization.gql'

function NavBar ({ children }: { children: JSX.Element }): JSX.Element {
  // const { register } = useForm()
  const { data: user, isLoading } = useQueryUser({ query: userMeQuery })
  const { isLoged, setUser } = useMutationUser()
  const { data: org, error: orgError } = useQueryOrganization({ query: currentOrganizationQuery })
  const [tryCount, setTryCount] = useState(0)

  // let timer: NodeJS.Timeout

  // const handleChange = (event: any): void => {
  //   clearTimeout(timer)

  //   timer = setTimeout(() => { console.log(event.target.value) }, 600)
  // }

  const handleLogout = (): void => {
    window.localStorage.removeItem('security-token')
    window.localStorage.removeItem('organization-token')
    setUser(false).catch(err => { console.log(err) })
  }

  useEffect(() => {
    if (!isLoading && user != null) return

    const logOut = (): void => {
      window.localStorage.removeItem('security-token')
      window.localStorage.removeItem('organization-token')
      setUser(false).catch(err => { console.log(err) })
    }
    if (!isLoading && user == null && tryCount < 3) setTryCount(tryCount + 1)
    if (!isLoading && user == null && tryCount >= 3) logOut()
  }, [tryCount, setUser, user, isLoading])

  return (
    <>
      <header className={style.header}>
        <nav className={style.nav}>
          <Logo
            org={org}
            orgError={orgError}
            styles={style.logoContainer}/>
          {/* <input
            type="search"
            id='searchNav'
            placeholder='Search...'
            {...register('searchNav', {
              onChange: handleChange
            })}
          /> */}
          <div className={style.navUserContainer}>
            {!isLoading && Boolean(user)
              ? <Avatar user={user}/>
              : isLoged && <div>Loading...</div> }
            <SesionButtons handleClick={handleLogout} isLoged={isLoged}/>
          </div>
        </nav>
      </header>
      {children}
    </>
  )
}

export default NavBar
