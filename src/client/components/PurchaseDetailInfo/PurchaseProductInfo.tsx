import OptionProduct from '#components/ProductList/OptionProduct'
import SearchSelect from '#components/SearchSelect/SearchSelect'
import { myProductsFiltered, myProductsPaginatedQuery, productCountByPage } from '#graphQLClient/product.gql'
import { useQueryProduct } from '#hooks/useProducts'
import React, { type Dispatch, useState, useEffect } from 'react'
import { type UseFormGetValues, type UseFormRegister, type UseFormSetValue } from 'react-hook-form'
import styles from '#styles/components/PurchaseDetailInfo/PurchaseProductInfo.module.css'
import MyButton from '#components/Buttons/MyButton'

interface PurchaseProductInfoProps {
  setValue: UseFormSetValue<any>
  selectArray: string[]
  register: UseFormRegister<any>
  errors: any
  setProductNum: Dispatch<React.SetStateAction<number>>
  setSelectArray: Dispatch<React.SetStateAction<string[]>>
  productNum: number
  purchase: any
  getValues: UseFormGetValues<any>
}

const PurchaseProductInfo = ({ setValue, selectArray, register, errors, setProductNum, setSelectArray, productNum, purchase, getValues }: PurchaseProductInfoProps): JSX.Element => {
  const [productList, setProductList] = useState([])
  const [pageIndex, setPageIndex] = useState(0)
  const [productFilter, setProductFilter] = useState<null | string>(null)
  const { data: products } = useQueryProduct({ query: myProductsPaginatedQuery, variables: { skip: 3 * pageIndex, take: 3 } })
  const { data: nextPageCount } = useQueryProduct({ query: productCountByPage, variables: { skip: 3 * (pageIndex + 1), take: 3 } })
  const { data: product } = useQueryProduct({ query: productFilter != null ? myProductsFiltered : null, variables: { filter: { name: productFilter } } })
  const [unitState, setUnitState] = useState([{
    id: '',
    selected: 'Seleccione un Producto'
  }])

  useEffect(() => {
    if (purchase?.detail != null && products?.myProductsPaginated != null) {
      const newSelectArray: any[] = []
      const newState = purchase.detail.map((product: any, index: number) => {
        newSelectArray.push(`detail${index}`)
        return {
          id: product.product.id,
          selected: product.product.name
        }
      })
      setSelectArray(newSelectArray)
      setUnitState(newState)
    }
  }, [purchase?.detail, setSelectArray, products?.myProductsPaginated])

  useEffect(() => {
    if (purchase != null && selectArray.length > 0) {
      purchase.detail.forEach((product: any, index: number) => {
        setValue(`detail${index}`, product.product.id)
        setValue(`cuantity${index}`, product.cuantity)
        setValue(`cost${index}`, product.cost)
      })
    }
  }, [purchase, setValue, selectArray])

  useEffect(() => {
    if (product != null) {
      setProductList(product.myProductsFiltered)
    } else if (products != null) {
      const newList = productList.length > 0 && pageIndex === 0 ? [].concat(products.myProductsPaginated) : productList.concat(products.myProductsPaginated)
      setProductList(newList)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, products])

  const componentState = {
    id: '',
    selected: 'Seleccione un Producto'
  }

  const cuantity = selectArray.map((_, index) => {
    return `cuantity${index}`
  })
  const cost = selectArray.map((_, index) => {
    return `cost${index}`
  })

  const handleCuantityChange = (): void => {
    const cuantityArray = getValues(cuantity)
    const costArray = getValues(cost)
    let totalCostCalculated = 0
    selectArray.forEach((item, index) => {
      if (!isNaN(parseInt(cuantityArray[index])) && !isNaN(parseFloat(costArray[index]))) {
        totalCostCalculated += parseInt(cuantityArray[index]) * parseFloat(costArray[index])
      }
    })
    setValue('total_cost', totalCostCalculated)
  }

  const handleCostChange = (): void => {
    const cuantityArray = getValues(cuantity)
    const costArray = getValues(cost)
    let totalCostCalculated = 0
    selectArray.forEach((item, index) => {
      if (!isNaN(parseInt(cuantityArray[index])) && !isNaN(parseFloat(costArray[index]))) {
        totalCostCalculated += parseInt(cuantityArray[index]) * parseFloat(costArray[index])
      }
    })
    setValue('total_cost', totalCostCalculated)
  }

  const handleTotalCost = (): void => {
    const cuantityArray = getValues(cuantity)
    const costArray = getValues(cost)
    let totalCostCalculated = 0
    selectArray.forEach((item, index) => {
      if (!isNaN(parseInt(cuantityArray[index])) && !isNaN(parseFloat(costArray[index]))) {
        totalCostCalculated += parseInt(cuantityArray[index]) * parseFloat(costArray[index])
      }
    })
    setValue('total_cost', totalCostCalculated)
  }

  return (
    <div className={styles.container}>
      <label>Detalle:</label>
      {selectArray.map((input, index) =>
      <div key={index} className={styles.detailContainer}>
        <div className={styles.selectGroup}>
          <label htmlFor={`detail${index}`}>Producto</label>
          {Boolean(products) &&
            <SearchSelect
              index={index}
              unitState={unitState}
              handleTotalCost={handleTotalCost}
              setFilter={setProductFilter}
              setPage={setPageIndex}
              nextPageCount={nextPageCount}
            >
              <ul>
                {productList.length > 0 &&
                  productList.map((product: any) => <OptionProduct
                    key={product.id}
                    product={product}
                    index={index}
                    unitState={unitState}
                    setUnitState={setUnitState}
                    setValue={setValue}
                    handleTotalCost={handleTotalCost}
                  />)}
              </ul>
            </SearchSelect>}
        </div>
        <select
          id={`detail${index}`}
          placeholder='Choose a product'
          {...register(`detail${index}`, {
            required: 'Required Field!'
          })}
        >
          <option value="">Seleccione un Producto</option>
          {productList.length > 0 &&
            productList.map((product: any) =>
              <option key={product.id} value={product.id}>{product.name}</option>)}
        </select>
        {(errors[`detail${index}`] != null) && <small>{errors[`detail${index}`].message}</small>}

        <div className={styles.selectGroup}>
          <label htmlFor={`cuantity${index}`}>Cantidad</label>
          <input
            type="number"
            id={`cuantity${index}`}
            placeholder='cuantity'
            {...register(`cuantity${index}`, {
              required: 'Required Field!',
              min: { value: 1, message: 'Min value 1' },
              onChange: handleCuantityChange
            })}
          />
          {(errors[`cuantity${index}`] != null) && <small>{errors[`cuantity${index}`].message}</small>}
        </div>

        <div className={styles.selectGroup}>
          <label htmlFor={`cost${index}`}>Costo</label>
          <input
            type="text"
            id={`cost${index}`}
            placeholder='cost'
            {...register(`cost${index}`, {
              required: 'Required Field!',
              min: 0,
              onChange: handleCostChange
            })}
          />
          {(errors[`cost${index}`] != null) && <small>{errors[`cost${index}`].message}</small>}
        </div>
      </div>
      )}

      <MyButton type='secondary' onClick={(e) => {
        e.preventDefault()
        setProductNum(productNum + 1)
        selectArray.push(`detail${productNum + 1}`)
        const newSelectArray = structuredClone(selectArray)
        setSelectArray(newSelectArray)
        unitState.push(componentState)
        const newUnitState = structuredClone(unitState)
        setUnitState(newUnitState)
      }}>+</MyButton>
    </div>
  )
}

export default PurchaseProductInfo
