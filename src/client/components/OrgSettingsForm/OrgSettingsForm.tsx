import MyButton from '#components/Buttons/MyButton'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import { useOrgSettings } from '#hooks/useOrganization'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styles from '#styles/components/OrgSettingsForm/OrgSettingsForm.module.css'

const defaultPic = 'https://res.cloudinary.com/jl-img-store/image/upload/v1684791765/ProfileImages/htskdgjphwuzmoht7dup.png'

const OrgSettingsForm = (): JSX.Element => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm()
  const { org, edit, generalError, getImgSource, handleCancel, handleEdit, imgPreview, isLoading, onSelectFile, onSubmit } = useOrgSettings()

  useEffect(() => {
    if (isLoading) return
    if (org != null) {
      setValue('name', org.myOrganization.name)
      setValue('brand_name', org.myOrganization.brand_name)
      setValue('identifier', org.myOrganization.identifier)
      setValue('telephone', org.myOrganization.telephone)
      setValue('email', org.myOrganization.email)
      setValue('address', org.myOrganization.address)
    }
  }, [isLoading, org, setValue])

  const newHandleCancel = (event: any): void => {
    handleCancel(event)
    setValue('image', undefined)
  }

  return (
    <section>
      <div className={styles.container}>
        <legend>Compañía</legend>
        <hr />
        {Boolean(org) &&
        <div className={styles.organizationCard}>
        <label htmlFor="image" className={edit ? styles.imageLabel : styles.noEditingImageLabel}>
        <Image
          src={getImgSource(imgPreview, defaultPic, edit, org.myOrganization.image?.url)}
          alt='User Profile Image'
          width={200}
          height={200}
          priority
        />
        </label>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id='name'
            disabled={!edit}
            {...register('name', {
              required: 'Field Required!'
            })}
          />
          {(errors.name != null) && <small>{errors.name.message as string}</small>}

          <label htmlFor="brand_name">Nombre Comercial</label>
          <input
            type="text"
            id='brand_name'
            disabled={!edit}
            {...register('brand_name')}
          />
          {(errors.brand_name != null) && <small>{errors.brand_name.message as string}</small>}

          <label htmlFor="identifier">CI/Ruc</label>
          <input
            type="text"
            id='identifier'
            disabled={!edit}
            {...register('identifier', {
              pattern: {
                value: /^\d{10,13}$/g,
                message: 'CI/Ruc should have at only numbers'
              },
              minLength: {
                value: 10,
                message: 'CI/Ruc should have at least 10 characters'
              }
            })}
          />
          {(errors.identifier != null) && <small>{errors.identifier.message as string}</small>}

          <label htmlFor="telephone">Teléfono</label>
          <input
            type="tel"
            id='telephone'
            disabled={!edit}
            {...register('telephone', {
              required: 'Required Field!'
            })}
          />
          {(errors.telephone != null) && <small>{errors.telephone.message as string}</small>}

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

          <label htmlFor="address">Dirección</label>
          <input
            type="text"
            id='address'
            disabled={!edit}
            {...register('address', {
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

export default OrgSettingsForm
