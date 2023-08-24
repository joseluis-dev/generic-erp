import React from 'react'
import styles from '#styles/components/DashBoardCard/DashBoardCard.module.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title, Filler } from 'chart.js'
import { Doughnut, Line } from 'react-chartjs-2'

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

const graphType = {
  doughnut: 'doughnut',
  areaLine: 'area-line'
}

type graphProp = 'doughnut' | 'area-line'

const DashBoardCard = ({ dataList, title, graph, dataGraph }: { dataList: any, title: string, graph?: graphProp, dataGraph?: any }): JSX.Element => {
  const Graph = ({ graph }: { graph?: string }): JSX.Element => {
    switch (graph) {
      case graphType.doughnut:
        return (
          <div className={styles.doughnutContainer}>
            <Doughnut data={dataGraph}/>
          </div>
        )
      case graphType.areaLine:
        return (
          <div className={styles.areaLineContainer}>
            <Line data={dataGraph} />
          </div>
        )
      default:
        return <></>
    }
  }

  const listStyles = (graph?: string): string => {
    switch (graph) {
      case graphType.doughnut:
        return styles.colorDetailDoughnut
      case graphType.areaLine:
        return styles.colorDetailArea
      default:
        return styles.cardDetail
    }
  }

  return (
    <div className={styles.cardContainer}>
      <legend>{title}</legend>
      <hr />
      <div className={`${styles.cardDetail} ${listStyles(graph)}`}>
        <div className={styles.detail}>
          {dataList.length > 0 &&
            <ul>
            {dataList.map((item: any, index: any) =>
              <li key={index}>
                <i>{item.icon}</i>
                <span>{item.title}</span>
                <span>{item.info}</span>
              </li>
            )}
            </ul>}
        </div>
        <Graph graph={graph}/>
      </div>
    </div>
  )
}

export default DashBoardCard
