import { loginOrganization } from '#graphQLClient/organization.gql'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { getAuth } from '#services/getJWT'
import { useMutationOrganization } from '#hooks/useOrganization'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import { hasUserPayment } from '#graphQLClient/payment.gql'
import { useQueryPayment } from '#hooks/usePayment'

interface ImageType {
  url: string
}
interface OrgType {
  id: string
  image: ImageType
  name: string
  telephone: string
  address: string
}

const message = {
  info: 'Select a plan to continue ..!'
}

const defaultPic = 'https://res.cloudinary.com/jl-img-store/image/upload/v1684791765/ProfileImages/htskdgjphwuzmoht7dup.png'

function Organization ({ org }: { org: OrgType }): JSX.Element {
  const { data: existUserPayment } = useQueryPayment({ query: hasUserPayment })
  const { trigger: loginOrg, error } = useMutationOrganization()
  const [info, setInfo] = useState<null | string>(null)
  const [signal, setSignal] = useState(false)

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (error != null || message != null) {
      timer = setTimeout(() => {
        setInfo(null)
      }, signal ? 100 : 6000)
    }

    return () => { clearTimeout(timer) }
  }, [error, info, signal])

  const handleClick = (): void => {
    setSignal(false)
    if (existUserPayment?.hasUserPayment === false) {
      setInfo(message.info)
      return
    }
    const orgClicked = {
      orgID: org.id
    }
    loginOrg({ query: loginOrganization, variables: orgClicked, headers: { authorization: getAuth() } })
      .catch((err: any) => { console.log(err) })
  }

  return (
    <>
    <MessageHandler
      error={error}
      info={info}
      setSignal={setSignal}
    />
    <li onClick={handleClick}>
        <Image
          src={org.image?.url ?? defaultPic}
          alt='Logo de la Organizacion'
          width={60}
          height={60}
          priority
        />
        <div>
          <h3>{org.name}</h3>
          <p>telf: {org.telephone}</p>
          <p>address: {org.address}</p>
        </div>
    </li>
    </>
  )
}

export default Organization
