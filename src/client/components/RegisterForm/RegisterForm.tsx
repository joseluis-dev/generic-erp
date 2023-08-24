import MessageHandler from '#components/MessageHandler/MessageHandler'
import { userAddQuery } from '#graphQLClient/user.gql'
import { useMutationUser } from '#hooks/useUser'
import { type SubmitHandler, useForm } from 'react-hook-form'
import style from '#styles/components/RegisterForm/RegisterForm.module.css'
import MyButton from '#components/Buttons/MyButton'

interface SignInFormValues {
  fullName: string
  email: string
  userName: string
  password: string
}

function RegisterForm (): JSX.Element {
  const { register, handleSubmit, formState: { errors } } = useForm<SignInFormValues>()
  const { data: userRegistered, error, trigger: signIn } = useMutationUser()

  const onSubmit: SubmitHandler<SignInFormValues> = (values) => {
    signIn({ query: userAddQuery, variables: values }).catch(err => { console.log(err) })
  }

  return (
    <div className={style.formContainer}>
      <MessageHandler
        error={error}
        info={
          userRegistered != null && error == null
            ? 'Sign Up Successfull'
            : undefined
        }/>
      <form onSubmit={handleSubmit(onSubmit)} className={style.formCard}>
        <h1>Registro</h1>

        <label htmlFor="fullName">Nombre Completo</label>
        <input
          type="text"
          id='fullName'
          placeholder='Enter your fullName'
          {...register('fullName', {
            required: 'Required Field!'
          })}
        />
        {(errors.fullName != null) && <small>{errors.fullName.message as string}</small>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id='email'
          placeholder='Enter your email'
          {...register('email', {
            required: 'Required Field!'
          })}
        />
        {(errors.email != null) && <small>{errors.email.message as string}</small>}

        <label htmlFor="userName">Nombre de Usuario</label>
        <input
          type="text"
          id='userName'
          placeholder='Enter your username'
          {...register('userName', { required: 'Required Field!' })}
        />
        {(errors.userName != null) && <small>{errors.userName.message as string}</small>}

        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id='password'
          placeholder='Enter your password'
          {...register('password', {
            required: 'Required Field!',
            minLength: { value: 4, message: 'Password should have at least of 8 characters' },
            maxLength: { value: 25, message: 'Password should have max 25 characters' }
          })}
        />
        {(errors.password != null) && <small>{errors.password.message as string}</small>}

        <MyButton type='primary'>Registrar</MyButton>

        <MyButton href='/' type='secondary'>Cancelar</MyButton>
      </form>
    </div>
  )
}

export default RegisterForm
