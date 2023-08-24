import OptionProduct from '#components/ProductList/OptionProduct'
import SearchSelect from '#components/SearchSelect/SearchSelect'
import { myProductsFiltered, myProductsPaginatedQuery, productCountByPage } from '#graphQLClient/product.gql'
import { useQueryProduct } from '#hooks/useProducts'
import React, { type Dispatch, useState, useEffect } from 'react'
import { type UseFormGetValues, type UseFormRegister, type UseFormSetValue } from 'react-hook-form'
import styles from '#styles/components/SaleDetailInfo/SaleProductInfo.module.css'
import MyButton from '#components/Buttons/MyButton'

interface SaleProductInfoProps {
  setValue: UseFormSetValue<any>
  selectArray: string[]
  register: UseFormRegister<any>
  errors: any
  setProductNum: Dispatch<React.SetStateAction<number>>
  setSelectArray: Dispatch<React.SetStateAction<string[]>>
  productNum: number
  sale: any
  getValues: UseFormGetValues<any>
}

const SaleProductInfo = ({ setValue, selectArray, register, errors, setProductNum, setSelectArray, productNum, sale, getValues }: SaleProductInfoProps): JSX.Element => {
  const [pageIndex, setPageIndex] = useState(0)
  const { data: products } = useQueryProduct({ query: myProductsPaginatedQuery, variables: { skip: 3 * pageIndex, take: 3 } })
  const [productList, setProductList] = useState(products != null ? products.myProductsPaginated : [])
  const [productFilter, setProductFilter] = useState<null | string>(null)
  const { data: nextPageCount } = useQueryProduct({ query: productCountByPage, variables: { skip: 3 * (pageIndex + 1), take: 3 } })
  const { data: product } = useQueryProduct({ query: productFilter != null ? myProductsFiltered : null, variables: { filter: { name: productFilter } } })
  const [unitState, setUnitState] = useState([{
    id: '',
    selected: 'Select a product'
  }])

  useEffect(() => {
    if (sale?.product != null && products?.myProductsPaginated != null) {
      const newSelectArray: any[] = []
      const newState = sale.product.map((product: any, index: number) => {
        newSelectArray.push(`detail${index}`)
        return {
          id: product.product.id,
          selected: product.product.name
        }
      })
      setSelectArray(newSelectArray)
      setUnitState(newState)
    }
  }, [sale?.product, setSelectArray, products?.myProductsPaginated])

  useEffect(() => {
    if (sale != null && selectArray.length > 0) {
      sale.product.forEach((product: any, index: number) => {
        setValue(`detail${index}`, product.product.id)
        setValue(`cuantity${index}`, product.cuantity)
        setValue(`cost${index}`, product.cost)
      })
    }
  }, [sale, setValue, selectArray])

  useEffect(() => {
    if (product != null) {
      setProductList(product.myProductsFiltered)
      return
    }
    if (pageIndex === 0) {
      setProductList(products != null ? products.myProductsPaginated : [])
      return
    }
    if (products != null && pageIndex > 0) {
      setProductList((prevList: any) => prevList.concat(products.myProductsPaginated))
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product, products, pageIndex])

  const componentState = {
    id: '',
    selected: 'Seleccione un producto'
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
          </SearchSelect>
        </div>
        <select
          id={`detail${index}`}
          placeholder='Choose a client'
          {...register(`detail${index}`, {
            required: 'Required Field!'
          })}
        >
          <option value="">Seleccione un producto</option>
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

export default SaleProductInfo
