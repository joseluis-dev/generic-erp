import React from 'react'
import { SvgClient } from '#assets/SvgClients'
import { SvgWarning } from '#assets/SvgWarning'
import DashBoardCard from '#components/DashBoardCard/DashBoardCard'
import { countClientsByStatus } from '#graphQLClient/clients.gql'
import { useQueryClient } from '#hooks/useClient'
import styles from '#styles/components/DashBoardClients/DashBoardClients.module.css'

const DashBoardClients = (): JSX.Element => {
  const { data: countActiveClients } = useQueryClient({ query: countClientsByStatus, variables: { statusCode: 'A' } })
  const { data: countSuspendedClients } = useQueryClient({ query: countClientsByStatus, variables: { statusCode: 'S' } })

  const dataList = [
    {
      icon: <SvgClient />,
      info: countActiveClients?.countClientsByStatus,
      title: 'Activo'
    },
    {
      icon: <SvgWarning />,
      info: countSuspendedClients?.countClientsByStatus,
      title: 'Suspendido'
    }
  ]

  const dataGraph = {
    labels: dataList.map((data: any, index: any) => (data.title)),
    datasets: [
      {
        label: '# Clientes',
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
      <DashBoardCard dataList={dataList} title='Clientes' graph='doughnut' dataGraph={dataGraph} />
    </div>
  )
}

export default DashBoardClients
