import { useRouter } from 'next/router'
import React from 'react'

const Product = ({ element }: { element: any }): JSX.Element => {
  const router = useRouter()
  const handleClick = (): void => {
    router.push(`/home/product/${element.id as string}`).catch(err => { console.log(err) })
  }
  return (
    <>
    <tr onClick={handleClick}>
      <td><strong>{element.code}</strong></td>
      <td>{element.name}</td>
      <td>{element.cost}</td>
      <td>{element.description}</td>
      <td>{element.inventory.cuantity}</td>
      <td>{element.inventory.location}</td>
    </tr>
    </>
  )
}

export default Product
