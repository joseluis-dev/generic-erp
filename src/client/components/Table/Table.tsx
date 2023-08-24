import MyButton from '#components/Buttons/MyButton'
import React, { type Dispatch } from 'react'
import styles from '#styles/components/Table/Table.module.css'

interface TablePropsType {
  data: any
  nextPageCount?: number
  pageIndex?: number
  setPageIndex?: Dispatch<React.SetStateAction<number>>
  RowComponent: (props: any) => JSX.Element
  children: JSX.Element
}

const Table = ({ data, nextPageCount, pageIndex, setPageIndex, RowComponent, children }: TablePropsType): JSX.Element => {
  return (
    <>
    <table className={styles.table}>
      <thead>
        {children}
      </thead>
      <tbody>
        {data.map((element: any, index: any) => <RowComponent key={index} element={element} />)}
      </tbody>
    </table>
    <div>
    <hr />
      {nextPageCount != null && pageIndex != null && setPageIndex != null &&
        <>
        <MyButton type='secondary' onClick={() => {
          if (pageIndex > 0) { setPageIndex(pageIndex - 1) }
        }}>Anterior</MyButton>
        <MyButton type='secondary' onClick={() => {
          if (nextPageCount > 0) { setPageIndex(pageIndex + 1) }
        }}>Siguiente</MyButton>
        </>}
    </div>
    </>
  )
}

export default Table
