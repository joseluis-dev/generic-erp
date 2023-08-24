import MyButton from '#components/Buttons/MyButton'
import ClientForm from '#components/ClientForm/ClientForm'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import { myClient } from '#graphQLClient/clients.gql'
import { useQueryClient } from '#hooks/useClient'
import { useModal } from 'easy-modal-hook'
import { useRouter } from 'next/router'
import React from 'react'
import styles from '#styles/components/ClientDetailInfo/ClientDetailInfo.module.css'
import { SvgClose } from '#assets/SvgClose'

const ClientDetailInfo = (): JSX.Element => {
  const router = useRouter()
  const { clientID } = router.query
  const { data: client, error: clientError, isLoading, mutate: setClient } = useQueryClient({
    query: clientID != null ? myClient : null,
    variables: { clientID }
  })
  const { Modal, openModal, closeModal } = useModal({ closeIcon: <SvgClose /> })
  const clientProp = client != null ? client.oneClient : null

  return (
    <div className={styles.container}>
      <MessageHandler error={clientError}/>
      <Modal className={styles.modal}>
        <ClientForm client={clientProp} closeModal={closeModal} setClient={setClient}/>
      </Modal>
      {!isLoading && Boolean(client) && Boolean(client.oneClient)
        ? <section>
              <div className={styles.infoCard}>
                <legend>Cliente</legend>
                <hr />
                <div className={styles.buttonsContainer}>
                  <MyButton type='secondary' onClick={openModal}>Editar</MyButton>
                </div>
                <h2>{client.oneClient.fullName}</h2>
                <label><div>CI/Ruc:</div> {client.oneClient.idNumber}</label>
                <label><div>Email:</div> {client.oneClient.email}</label>
                <label><div>Dirección:</div> {client.oneClient.address}</label>
                <label><div>Teléfono:</div> {client.oneClient.telephone}</label>
              </div>
            </section>
        : <div>Loading...</div>}
    </div>
  )
}

export default ClientDetailInfo
