import MyButton from '#components/Buttons/MyButton'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import { modifyRol, removeUserQuery } from '#graphQLClient/user.gql'
import { useMutationUser } from '#hooks/useUser'
import { getAuth, getOrgAuth } from '#services/getJWT'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from '#styles/components/UserList/User.module.css'

const defaultPic = 'https://res.cloudinary.com/jl-img-store/image/upload/v1684791341/ProfileImages/vczxestyqlmqgcwbr7c1.png'

const errorMessages = {
  editError: 'MASTER can only be changed by System Admin',
  removeError: 'MASTER can only be removed by System Admin'
}

const User = ({ user: { user, rol }, setUserList }: { user: any, setUserList: any }): JSX.Element => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [edit, setEdit] = useState(false)
  const { error: rolError, trigger: setRol } = useMutationUser()
  const { error: ruError, trigger: removeUser, isMutating: ruMutating } = useMutationUser()
  const [error, setError] = useState<any>(null)
  const [signal, setSignal] = useState(false)

  useEffect(() => {
    if (ruMutating) return
    setUserList()
  }, [ruMutating, setUserList])

  useEffect(() => {
    if (rolError != null) setError(rolError)
    if (ruError != null) setError(ruError)
  }, [rolError, ruError])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (error != null) {
      timer = setTimeout(() => {
        setError(null)
      }, signal ? 100 : 6000)
    }

    return () => { clearTimeout(timer) }
  }, [error, signal])

  const headers = {
    authorization: getAuth(),
    organization: getOrgAuth()
  }

  const handleEdit = (event: any): void => {
    setSignal(false)
    if (rol === 'MASTER') {
      setError(
        (prevMessage: any) => prevMessage == null ? errorMessages.editError : prevMessage
      )
    } else {
      event.preventDefault()
      setEdit(true)
    }
  }
  const onSubmit = (values: any): void => {
    const rolToChange = {
      userID: user.id,
      rol: values.rolSelect ?? rol
    }
    setRol({ query: modifyRol, headers, variables: rolToChange }).catch(err => { console.log(err) })
    setEdit(false)
  }
  const handleRemove = (event: any): void => {
    setSignal(false)
    if (rol === 'MASTER') {
      setError(errorMessages.removeError)
    } else {
      event.preventDefault()
      const objVariables = {
        userID: user.id
      }
      removeUser({ query: removeUserQuery, headers, variables: objVariables }).catch(err => { console.log(err) })
    }
  }

  return (
    <>
      <MessageHandler error={error} setSignal={setSignal} />
      <li >
        <div className={styles.userInfo}>
            {user.image != null
              ? <Image
              src={user.image?.url}
              alt='Logo de la Organizacion'
              width={60}
              height={60}
              priority
            />
              : <Image
              src={defaultPic}
              alt='Logo de la Organizacion'
              width={60}
              height={60}
              priority
            />}
            <div>
              <h3>{user.fullName}</h3>
              <p>Username: {user.userName}</p>
              <p>Email: {user.email}</p>
            </div>
        </div>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <select
              disabled={!edit}
              defaultValue={rol}
              id='rolSelect'
              {...register('rolSelect')}
            >
              <option value="NORMAL">NORMAL</option>
              <option value="ADMIN">ADMIN</option>
            </select>
            {(errors.rolSelect != null) && <small>{errors.rolSelect.message as string}</small> }
            {edit
              ? <MyButton type='primary'>Guardar</MyButton>
              : <MyButton type='primary' onClick={handleEdit}>Editar</MyButton>}
            <MyButton type='danger' onClick={handleRemove}>Remover</MyButton>
          </form>
        </div>
      </li>
    </>
  )
}

export default User
