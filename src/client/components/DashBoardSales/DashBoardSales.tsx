import React, { useState } from 'react'
import { SvgCash } from '#assets/SvgCash'
import DashBoardCard from '#components/DashBoardCard/DashBoardCard'
import Sale from '#components/SaleList/Sale'
import Table from '#components/Table/Table'
import { mySalesByDate } from '#graphQLClient/sales.qgl'
import { useQuerySale } from '#hooks/useSale'
import styles from '#styles/components/DashBoardSales/DashBoardSales.module.css'

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

const DashBoardSales = (): JSX.Element => {
  const [currentDate] = useState(new Date())
  const [pastDate] = useState(new Date(currentDate.getTime() - (1000 * 60 * 60 * 24 * 7 * 4 * 6)))
  const { data: completeSales } = useQuerySale({ query: mySalesByDate, variables: { initDate: pastDate.toISOString(), endDate: currentDate.toISOString() } })

  const graphMonths = (): any => {
    const startMonth = pastDate.getMonth()
    const indexedMonths: any = {}

    let k = 0
    for (let i = startMonth; i < startMonth + 6; i++) {
      let j = i
      if (j > 11) j = j - 12
      indexedMonths[months[j]] = k
      k++
    }
    return indexedMonths
  }

  const indexedMonths = graphMonths()
  const totalPerMonthSales = completeSales?.mySalesByDate.reduce((acc: number[], current: any) => {
    const month = new Date(current.sale_date).getMonth()
    const indexMonth = indexedMonths[months[month]]
    acc[indexMonth] = acc[indexMonth] + (current.total_cost as number)
    return acc
  }, [0, 0, 0, 0, 0, 0])

  const topSales = (): [] => {
    const sortedSales = completeSales?.mySalesByDate.sort((a: any, b: any) => {
      return b.total_cost - a.total_cost
    })
    const topFiveSales = sortedSales?.slice(0, 5)
    return topFiveSales
  }

  const dataList = totalPerMonthSales != null
    ? Object.keys(indexedMonths).map((month: any, index: any) => (
      {
        icon: <SvgCash />,
        info: `$${totalPerMonthSales[index] as string}`,
        title: `${month as string}`
      }
    ))
    : []

  const dataGraph = {
    labels: Object.keys(graphMonths()),
    datasets: [
      {
        fill: true,
        label: 'Ventas Totales',
        data: totalPerMonthSales,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 2
      }
    ]
  }

  return (
    <div className={styles.container}>
      <DashBoardCard dataList={dataList} title='Ventas' dataGraph={dataGraph} graph='area-line' />
      <Table
        RowComponent={Sale}
        data={topSales() != null ? topSales() : []}
      >
        <tr>
          <th>Descripción</th>
          <th>Valor Total</th>
          <th>Cliente</th>
        </tr>
      </Table>
    </div>
  )
}

export default DashBoardSales
