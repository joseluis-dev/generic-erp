import React from 'react'
import { SvgProducts } from '#assets/SvgProducts'
import { SvgWarning } from '#assets/SvgWarning'
import DashBoardCard from '#components/DashBoardCard/DashBoardCard'
import { countProductsByStatus } from '#graphQLClient/product.gql'
import { useQueryProduct } from '#hooks/useProducts'
import styles from '#styles/components/DashBoardProducts/DashBoardProducts.module.css'

const DashBoardProducts = (): JSX.Element => {
  const { data: countInStockProducts } = useQueryProduct({ query: countProductsByStatus, variables: { statusCode: 'I' } })
  const { data: countOutStockProducts } = useQueryProduct({ query: countProductsByStatus, variables: { statusCode: 'O' } })

  const dataList = [
    {
      icon: <SvgProducts />,
      info: countInStockProducts?.countProductsByStatus,
      title: 'En Stock'
    },
    {
      icon: <SvgWarning />,
      info: countOutStockProducts?.countProductsByStatus,
      title: 'Sin Stock'
    }
  ]

  const dataGraph = {
    labels: dataList.map((data: any, index: any) => (data.title)),
    datasets: [
      {
        label: '# Productos',
        data: dataList.map((data: any, index: any) => (data.info)),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }
    ]
  }

  return (
    <div className={styles.container}>
      <DashBoardCard dataList={dataList} title='Productos' graph='doughnut' dataGraph={dataGraph} />
    </div>
  )
}

export default DashBoardProducts
