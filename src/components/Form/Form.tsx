import { FC, useContext, useMemo } from 'react'
import { sendForm } from '../../api/sendForm'
import styles from './Form.module.scss'
import cn from 'classnames'
import { toast } from 'react-toastify'
import Card from '../Card/Card'
import { Controller, useForm } from 'react-hook-form'
import { ValidationContext } from '../../Services/ValidationService'

const getUniqueId = () => String(Math.random()) + String(Date.now())

export type TPassager = {
  id: string
  lastName: string
  firstName: string
  middleName: string
  gender: string
  date: string
  citizenship: string
  document: string
  docNumbers: string
  agreement: boolean
  phoneNumber: string
  mail: string
}

export const getEmptyUser = () => {
  console.log('getEmptyUser')

  return {
    id: getUniqueId(),
    lastName: '',
    firstName: '',
    middleName: '',
    gender: '',
    date: '',
    citizenship: '',
    document: '',
    docNumbers: '',
    agreement: false,
    phoneNumber: '',
    mail: '',
  }
}
export type TKey = keyof TPassager

export type TForm = {
  users: TPassager[]
}

const Form: FC = () => {
  const { errors } = useContext(ValidationContext)
  const form = useForm<TForm>({
    mode: 'onSubmit',
    defaultValues: { users: [getEmptyUser()] },
  })
  const onSubmit = (data: TForm) => {
    sendForm(data)
      .then((res) => {
        toast(`🦄 Форма отправленна! Статус: ${res.status}`, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        form.setValue('users', [getEmptyUser()])
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
  const isDisabled = useMemo(() => {
    return JSON.stringify(errors) !== '{}'
  }, [errors])

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <div className={styles.card}>
        <Card control={form.control} />
        <Controller
          control={form.control}
          name='users'
          render={({ field }) => {
            const handleAddUser = () => {
              field.onChange([...field.value, getEmptyUser()])
            }
            return (
              <div className={styles.card_buttons}>
                {!!field.value.length && (
                  <button
                    type='submit'
                    className={cn(styles.card_button, styles.submit)}
                    disabled={isDisabled}
                  >
                    Отправить
                  </button>
                )}
                <button
                  type='button'
                  className={cn(styles.card_button, styles.add)}
                  onClick={handleAddUser}
                >
                  Добавить пассажира
                </button>
              </div>
            )
          }}
        />
      </div>
    </form>
  )
}
export default Form
