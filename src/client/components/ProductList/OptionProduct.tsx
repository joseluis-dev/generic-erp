import React from 'react'

interface OptionProductPropsType {
  product: any
  index: number
  unitState: any
  setUnitState: any
  setValue: any
  handleTotalCost: any
}

const OptionProduct = ({ product, unitState, index, setUnitState, setValue, handleTotalCost }: OptionProductPropsType): JSX.Element => {
  const handleClick = (): void => {
    unitState[index].selected = product.name
    unitState[index].id = product.id
    const newUnitState = structuredClone(unitState)
    setUnitState(newUnitState)
    setValue(`detail${index}`, product.id)
    setValue(`cuantity${index}`, 1)
    setValue(`cost${index}`, product.cost)
    handleTotalCost()
  }

  return (
    <li
      key={product.id}
      onClick={handleClick}
    >
      {product.name}
    </li>
  )
}

export default OptionProduct
