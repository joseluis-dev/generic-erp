import React from 'react'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { userLoginQuery } from '#graphQLClient/user.gql'
import MessageHandler from '#components/MessageHandler/MessageHandler'
import style from '#styles/components/LoginForm/LoginForm.module.css'
import MyButton from '#components/Buttons/MyButton'

interface FormValues {
  userNameLogin: string
  passwordLogin: string
}

function LoginForm ({ login, error }: { login: any, error: any }): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = (values: any): void => {
    const objVariables = {
      userName: values.userNameLogin,
      password: values.passwordLogin
    }
    login({ query: userLoginQuery, variables: objVariables }).catch((err: any) => { console.error(err) })
  }
  return (
    <div className={style.formContainer}>
      <MessageHandler error={error}/>
      <form onSubmit={handleSubmit(onSubmit)} className={style.formCard}>
        <h1>Ingreso</h1>

        <label htmlFor="userNameLogin">Nombre de Usuario</label>
        <input
          type="text"
          id='userNameLogin'
          placeholder='Enter your username'
          {...register('userNameLogin', { required: 'Required Field!' })}
        />
        {(errors.userNameLogin != null) && <small>{errors.userNameLogin.message as string}</small>}

        <label htmlFor="passwordLogin">Contraseña</label>
        <input
          type="password"
          id='passwordLogin'
          placeholder='Enter your password'
          {...register('passwordLogin', {
            required: 'Required Field!',
            minLength: { value: 4, message: 'Password should have at least of 8 characters' },
            maxLength: { value: 25, message: 'Password should have max 25 characters' }
          })}
        />
        {(errors.passwordLogin != null) && <small>{errors.passwordLogin.message as string}</small>}

        <MyButton type='primary'>Iniciar Sesión</MyButton>

        <MyButton href='/' type='secondary'>Cancelar</MyButton>
      </form>
    </div>
  )
}

export default LoginForm
