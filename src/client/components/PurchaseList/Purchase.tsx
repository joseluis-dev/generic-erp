import { useRouter } from 'next/router'
import React from 'react'

const Purchase = ({ element }: { element: any }): JSX.Element => {
  const router = useRouter()
  const handleClick = (): void => {
    router.push(`/home/purchase/${element.id as string}`).catch(err => { console.log(err) })
  }

  return (
    <>
    <tr onClick={handleClick}>
      <td><strong>{element.description}</strong></td>
      <td>{element.total_cost}</td>
      <td>{element.provider.name}</td>
    </tr>
    </>
  )
}

export default Purchase
