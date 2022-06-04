import { FC } from 'react'
import MyTextInput from './atoms/MyInput'
import MyCheckbox from './atoms/MyCheckbox'
import MySelect from './atoms/MySelect'
import { TForm, TKey, TPassager } from '../Form/Form'
import { Control, Controller } from 'react-hook-form'
import produce from 'immer'
import styles from './Card.module.scss'

interface IProps {
  control: Control<TForm, any>
}

export type TTextKey = Exclude<TKey, 'agreement'>

const Card: FC<IProps> = ({ control }) => {
  return (
    <Controller
      control={control}
      name='users'
      render={({ field }) => {
        const handleTextChange = (
          params: { value: string; key: TTextKey },
          id: string
        ) => {
          const nextValues = produce(field.value, (draft) => {
            const current = draft.find(
              (draftUser) => draftUser.id === id
            ) as TPassager
            current[params.key] = params.value
          })
          field.onChange(nextValues)
        }
        return (
          <>
            {field.value.map((user, index) => {
              return (
                <div className={styles.card_container} key={user.id}>
                  {field.value.length > 1 && (
                    <button
                      className={styles.card_close}
                      type='button'
                      onClick={() => {
                        const nextValue = produce(field.value, (draft) => {
                          return (draft = draft.filter(
                            (el) => el.id !== user.id
                          ))
                        })

                        field.onChange(nextValue)
                      }}
                    >
                      ❌
                    </button>
                  )}
                  <div>
                    <label>{`Пассажир ${index + 1}`}</label>
                    <div className={styles.card_basic}>
                      <MyTextInput
                        control={control}
                        label='Фамилия *'
                        value={user.lastName}
                        onChange={(v) => {
                          handleTextChange(v, user.id)
                        }}
                        name={'lastName'}
                        validator={(val) => {
                          if (val.length < 3) {
                            return 'Введите больше символов'
                          }
                          if (val.length > 15) {
                            return 'Введите меньше 15 символов'
                          }
                          return null
                        }}
                        userId={user.id}
                        required
                      />
                      <MyTextInput
                        control={control}
                        label='Имя *'
                        value={user.firstName}
                        onChange={(v) => {
                          handleTextChange(v, user.id)
                        }}
                        name={'firstName'}
                        userId={user.id}
                        validator={(val) => {
                          if (val.length < 3) {
                            return 'Введите больше символов'
                          }
                          if (val.length > 15) {
                            return 'Введите меньше 15 символов'
                          }
                          return null
                        }}
                        required
                      />
                      <MyTextInput
                        control={control}
                        label='Отчество *'
                        value={user.middleName}
                        onChange={(v) => {
                          handleTextChange(v, user.id)
                        }}
                        name={'middleName'}
                        userId={user.id}
                        validator={(val) => {
                          if (val.length < 3) {
                            return 'Введите больше символов'
                          }
                          if (val.length > 15) {
                            return 'Введите меньше 15 символов'
                          }
                          return null
                        }}
                        required
                      />
                      <MySelect
                        label='Пол *'
                        name='gender'
                        onChange={(v) => {
                          handleTextChange(v, user.id)
                        }}
                      >
                        <option value='male'>Мужчина</option>
                        <option value='female'>Женщина</option>
                      </MySelect>
                      <MyTextInput
                        control={control}
                        label='Дата рождения *'
                        type='date'
                        value={user.date}
                        onChange={(v) => {
                          handleTextChange(v, user.id)
                        }}
                        name={'date'}
                        userId={user.id}
                        required
                      />
                      <MySelect
                        label='Гражданство *'
                        name='citizenship'
                        onChange={(v) => {
                          handleTextChange(v, user.id)
                        }}
                      >
                        <option value='ru'>РФ</option>
                        <option value='us'>США</option>
                        <option value='de'>Германия</option>
                        <option value='jp'>Японимя</option>
                      </MySelect>
                      <MySelect
                        label='Тип документа *'
                        name='document'
                        onChange={(v) => {
                          handleTextChange(v, user.id)
                        }}
                      >
                        <option value='passportRF'>Паспорт РФ</option>
                        <option value='passportUSSR'>Паспорт СССР</option>
                      </MySelect>
                      <MyTextInput
                        control={control}
                        label='Номер документа *'
                        type='number'
                        value={user.docNumbers}
                        onChange={(v) => {
                          handleTextChange(v, user.id)
                        }}
                        name={'docNumbers'}
                        userId={user.id}
                        validator={(val) => {
                          if (val.length !== 10) {
                            return 'Номер документа состоит из 10'
                          }
                          return null
                        }}
                        required
                      />
                    </div>
                    <div className={styles.card_additional}>
                      <MyCheckbox
                        value={user.agreement}
                        onChange={(checked) => {
                          field.onChange(
                            produce(field.value, (draft) => {
                              const current = draft.find(
                                (el) => el.id === user.id
                              )
                              current!.agreement = checked
                            })
                          )
                        }}
                      >
                        Согласен на получение опомещений
                      </MyCheckbox>
                      <div className={styles.card_basic}>
                        <MyTextInput
                          control={control}
                          type='tel'
                          label='Номер телефона'
                          value={user.phoneNumber}
                          onChange={(v) => {
                            handleTextChange(v, user.id)
                          }}
                          name={'phoneNumber'}
                          userId={user.id}
                          validator={(val) => {
                            if (val.length !== 11) {
                              return 'Пример: 79001234567'
                            }
                            return null
                          }}
                        />
                        <MyTextInput
                          control={control}
                          label='email'
                          value={user.mail}
                          onChange={(v) => {
                            handleTextChange(v, user.id)
                          }}
                          validator={(val) => {
                            if (
                              !val.match(
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                              )
                            ) {
                              return 'Неккоректный адресс'
                            }
                            return null
                          }}
                          name={'mail'}
                          userId={user.id}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </>
        )
      }}
    />
  )
}
export default Card
