import { useModal } from 'easy-modal-hook'
import React, { useCallback, useEffect, useRef } from 'react'
import styles from '#styles/components/SearchSelect/SearchSelect.module.css'
import { useObserver } from '#hooks/useObserver'
import debounce from 'just-debounce-it'

interface SearchSelectPropsType {
  index: number
  unitState?: any
  handleTotalCost?: any
  setFilter?: any
  children: any
  nextPageCount: any
  setPage: any
}

const SearchSelect = ({ index, unitState, handleTotalCost, setFilter, children, nextPageCount, setPage }: SearchSelectPropsType): JSX.Element => {
  const unicID = handleTotalCost != null ? `product${index}` : `client${index}`
  const { Modal, openModal, closeModal, isShown } = useModal({
    root: `modal-select-${unicID}`
  })
  const externalRef = useRef(null)
  const { isNearScreen } = useObserver({
    externalRef,
    once: !(nextPageCount?.clientCountByPage > 0 || nextPageCount?.productCountByPage > 0),
    distance: '0px'
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceHandleNextPage = useCallback(
    debounce(
      () => setPage((prevPage: number) => prevPage + 1)
      , 200)
    , [])

  useEffect(() => {
    if (nextPageCount == null) return
    if (isNearScreen) {
      if (nextPageCount.clientCountByPage > 0 || nextPageCount.productCountByPage > 0) debounceHandleNextPage()
    }
  }, [isNearScreen, nextPageCount, debounceHandleNextPage])

  const bodyElement = typeof window !== 'undefined' ? document.querySelector('body') : undefined
  useEffect(() => {
    bodyElement?.addEventListener('click', closeModal)

    return () => bodyElement?.removeEventListener('click', closeModal)
  }, [closeModal, bodyElement])

  let timer: NodeJS.Timeout
  const handleChange = (event: any): void => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      if (event.target.value === '') {
        setFilter(null)
        setPage(0)
      } else setFilter(event.target.value)
    }, 600)
  }

  const toggleModal = (): any => {
    if (isShown) closeModal()
    else openModal()
  }

  return (
    <span id={`modal-select-${unicID}`} className={styles.searchContainer}>
      <label
        htmlFor={`inputSelect-${unitState[index]?.id as string}`}
        className={styles.labelInput}
        onClick={(e) => {
          bodyElement?.click()
          setFilter(null)
          setPage(0)
          toggleModal()
          e.stopPropagation()
        }}
      >
        {unitState[index]?.selected}
      </label>
      {isShown
        ? <div className={styles.inputSearchContainer}>
            <input
              className={styles.selectListInput}
              type="text"
              id={`inputSelect-${unitState[index]?.id as string}`}
              onChange={handleChange}
              onClick={(e) => { e.stopPropagation() }}
            />
          </div>
        : null}
      <Modal>
        <span className={styles.selectList}>
          {children}
        <div id={`viewfinder-${unicID}`} ref={externalRef}></div>
        </span>
      </Modal>
    </span>
  )
}

export default SearchSelect
