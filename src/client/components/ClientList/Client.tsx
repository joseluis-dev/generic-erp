import { useRouter } from 'next/router'
import React from 'react'

const Client = ({ element }: { element: any }): JSX.Element => {
  const router = useRouter()
  const handleClick = (): void => {
    router.push(`/home/client/${element.id as string}`).catch(err => { console.log(err) })
  }
  return (
    <>
    <tr onClick={handleClick}>
      <td><strong>{element.fullName}</strong></td>
      <td>{element.email}</td>
      <td>{element.idNumber}</td>
      <td>{element.telephone}</td>
    </tr>
    </>
  )
}

export default Client
