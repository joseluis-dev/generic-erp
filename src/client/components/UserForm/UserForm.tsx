import MyButton from '#components/Buttons/MyButton'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import { useUserProfile } from '#hooks/useUser'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styles from '#styles/components/UserForm/UserForm.module.css'

const defaultPic = 'https://res.cloudinary.com/jl-img-store/image/upload/v1684791341/ProfileImages/vczxestyqlmqgcwbr7c1.png'

const UserForm = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const { isLoading, user, getImgSource, imgPreview, edit, onSubmit, onSelectFile, handleCancel, handleEdit, generalError } = useUserProfile()

  useEffect(() => {
    if (isLoading) return
    if (user != null) {
      setValue('fullName', user.me.fullName)
      setValue('email', user.me.email)
      setValue('userName', user.me.userName)
      setValue('idNumber', user.me.idNumber)
    }
  }, [isLoading, user, setValue])

  const newHandleCancel = (event: any): void => {
    handleCancel(event)
    setValue('image', undefined)
  }

  return (
    <section>
      <div className={styles.container}>
        <legend>Información del Usuario</legend>
        <hr />
        {Boolean(user) &&
        <div className={styles.userInfo}>
        <label htmlFor="image" className={edit ? styles.imageLabel : styles.noEditingImageLabel}>
        <Image
          src={getImgSource(imgPreview, defaultPic, edit, user.me.image?.url)}
          alt='User Profile Image'
          width={100}
          height={100}
          priority
        />
        </label>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="fullName">Nombre</label>
          <input
            type="text"
            id='fullName'
            disabled={!edit}
            {...register('fullName', {
              required: 'Field Required!'
            })}
          />
          {(errors.fullName != null) && <small>{errors.fullName.message as string}</small>}

          <label htmlFor="idNumber">CI</label>
          <input
            type="text"
            id='idNumber'
            disabled={!edit}
            {...register('idNumber', {
              pattern: {
                value: /^[0-9]{10}$/g,
                message: 'CI/Ruc should have at least 10 characters'
              }
            })}
          />
          {(errors.idNumber != null) && <small>{errors.idNumber.message as string}</small>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id='fullName'
            disabled={!edit}
            {...register('email', {
              required: 'Field Required!'
            })}
          />
          {(errors.fullName != null) && <small>{errors.fullName.message as string}</small>}

          <label htmlFor="userName">Username</label>
          <input
            type="text"
            id='userName'
            disabled={!edit}
            {...register('userName', {
              required: 'Field Required!'
            })}
          />
          {(errors.fullName != null) && <small>{errors.fullName.message as string}</small>}

          <input
            type="file"
            id='image'
            disabled={!edit}
            accept="image/png, image/jpeg"
            {...register('image', {
              onChange: onSelectFile
            })}
            className={styles.fileInput}
          />
          {(errors.image != null) && <small>{errors.image.message as string}</small>}

          {edit
            ? <MyButton type='primary'>Guardar</MyButton>
            : <MyButton type='primary' onClick={handleEdit}>Editar</MyButton>}
            <MyButton type='secondary' onClick={newHandleCancel}>Cancelar</MyButton>
        </form>
        <MessageHandler error={generalError}/>
        </div>}
      </div>
    </section>
  )
}

export default UserForm
