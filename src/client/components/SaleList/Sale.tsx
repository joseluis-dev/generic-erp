import { useRouter } from 'next/router'
import React from 'react'

const Sale = ({ element }: { element: any }): JSX.Element => {
  const router = useRouter()
  const handleClick = (): void => {
    router.push(`/home/sale/${element.id as string}`).catch(err => { console.log(err) })
  }
  return (
    <>
    <tr onClick={handleClick}>
      <td><strong>{element.description}</strong></td>
      <td>{element.total_cost}</td>
      <td>{element.client.fullName}</td>
    </tr>
    </>
  )
}

export default Sale
