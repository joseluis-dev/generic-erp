import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

interface LogoPropsType {
  styles: any
  org: any
  orgError: any
}

const myLogo = 'https://res.cloudinary.com/jl-img-store/image/upload/v1679766665/ProfileImages/Logo_nsabmg.png'

const Logo = ({ styles, org, orgError }: LogoPropsType): JSX.Element => {
  const router = useRouter()
  const page = router.route

  return (
    <>
      {org == null || page === '/' || page === '/user-profile' || orgError != null
        ? <Link href='/' className={styles}>
            <Image
              src={myLogo}
              alt='Logo Principal'
              width={30}
              height={30}
            />
            <h1>CORE~ERP</h1>
          </Link>
        : <Link href='/' className={styles}>
            <Image
              src={org.myOrganization?.image?.url ?? myLogo}
              alt='Logo Principal'
              width={30}
              height={30}
            />
            <h1>{org.myOrganization?.name}</h1>
          </Link>
      }
    </>
  )
}

export default Logo
