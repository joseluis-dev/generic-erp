import { SvgClose } from '#assets/SvgClose'
import MyButton from '#components/Buttons/MyButton'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import ProviderForm from '#components/ProviderForm/ProviderForm'
import { myProvider } from '#graphQLClient/provider.gql'
import { useQueryProvider } from '#hooks/useProvider'
import { useModal } from 'easy-modal-hook'
import { useRouter } from 'next/router'
import styles from '#styles/components/ProviderDetailInfo/ProviderDetailInfo.module.css'

const ProviderDetailInfo = (): JSX.Element => {
  const router = useRouter()
  const { providerID } = router.query
  const { data: provider, error: providerError, isLoading, mutate: setProvider } = useQueryProvider({
    query: providerID != null ? myProvider : null,
    variables: { providerID }
  })
  const { Modal, openModal, closeModal } = useModal({ closeIcon: <SvgClose /> })
  const providerPorp = provider != null ? provider.oneProvider : null
  return (
    <div className={styles.container}>
      <MessageHandler error={providerError}/>
      <Modal className={styles.modal}>
        <ProviderForm provider={providerPorp} closeModal={closeModal} setProvider={setProvider}/>
      </Modal>
      {!isLoading && Boolean(provider) && Boolean(provider.oneProvider)
        ? <div className={styles.infoCard}>
              <legend>Proveedor</legend>
              <hr />
              <div className={styles.buttonsContainer}>
                <MyButton type='secondary' onClick={openModal}>Editar</MyButton>
              </div>
              <h2>{provider.oneProvider.name}</h2>
              <label><div>Nombre:</div> {provider.oneProvider.name}</label>
              <label><div>Ruc:</div> {provider.oneProvider.ruc}</label>
              <label><div>Cuenta de Banco:</div> {provider.oneProvider.bank_account}</label>
              <label><div>Email:</div> {provider.oneProvider.email}</label>
              <label><div>Teléfono:</div> {provider.oneProvider.telephone}</label>
              <label><div>Descripción:</div> {provider.oneProvider.description}</label>
            </div>
        : <div>Loading...</div>}
    </div>
  )
}

export default ProviderDetailInfo
