import { useRouter } from 'next/router'
import React from 'react'

const Provider = ({ element }: { element: any }): JSX.Element => {
  const router = useRouter()
  const handleClick = (): void => {
    router.push(`/home/provider/${element.id as string}`).catch(err => { console.log(err) })
  }
  return (
    <>
    <tr onClick={handleClick}>
      <td><strong>{element.name}</strong></td>
      <td>{element.email}</td>
      <td>{element.ruc}</td>
      <td>{element.telephone}</td>
      <td>{element.description}</td>
    </tr>
    </>
  )
}

export default Provider
