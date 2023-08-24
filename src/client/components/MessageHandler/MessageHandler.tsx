import React, { type Dispatch, useEffect, useState, memo } from 'react'
import styles from '#styles/components/MessageHandler/MessageHandler.module.css'
import { SvgWarning } from '#assets/SvgWarning'
import { useModal } from 'easy-modal-hook'
import { SvgClose } from '#assets/SvgClose'

const MessageHandler = memo(({ error, info, setSignal }: { error?: any, info?: string | null, setSignal?: Dispatch<React.SetStateAction<boolean>> }): JSX.Element => {
  const [showError, setShowError] = useState(false)
  const { Modal, openModal, closeModal } = useModal()

  let timer: NodeJS.Timeout
  let timer2: NodeJS.Timeout
  let timer3: NodeJS.Timeout
  useEffect(() => {
    if (error != null || info != null) {
      setShowError(true)
      openModal()
      hideError()
    }
    return () => {
      setShowError(false)
      closeModal()
      clearTimeout(timer)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, info])

  const handleReset = (): void => {
    setSignal?.(true)
    setShowError(false)
    setTimer()
    clearTimeout(timer2)
    clearTimeout(timer3)
  }

  const hideError = (): void => {
    timer2 = setTimeout(() => {
      setShowError(false)
    }, 5900)
    timer3 = setTimeout(() => {
      closeModal()
    }, 6000)
  }

  const setTimer = (): void => {
    timer = setTimeout(() => {
      closeModal()
    }, 100)
  }

  return (
    <Modal className={styles.modal}>
    <>
    {error != null
      ? <div className={showError ? `${styles.showMessage} ${styles.errorContainer}` : `${styles.hideMessage} ${styles.errorContainer}`}>
        <small className={styles.errorCloseIcon} onClick={() => {
          handleReset()
        }}><SvgClose /></small>
        {Boolean(error) && error.response != null
          ? error.response?.errors.map((err: any, index: any) => <div key={index} className={styles.message}>
            <i><SvgWarning /></i>
            <span>{err.message}</span>
          </div>)
          : Boolean(error) && <div className={styles.message}>
              <i><SvgWarning /></i>
              <span>{error}</span>
            </div>}
      </div>
      : <></>}
      {info != null
        ? <div className={showError ? `${styles.showMessage} ${styles.infoContainer}` : `${styles.hideMessage} ${styles.infoContainer}`}>
            <small className={styles.infoCloseIcon} onClick={() => {
              handleReset()
            }}><SvgClose /></small>
            <div className={styles.message}>
              <i><SvgWarning /></i>
              <span>{info}</span>
            </div>
          </div>
        : <></>}
    </>
    </Modal>
  )
})

MessageHandler.displayName = 'MessageHandler'

export default MessageHandler
