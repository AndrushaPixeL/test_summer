import { FC, useContext, useEffect, useState } from 'react'
import { Control } from 'react-hook-form'
import { ValidationContext } from '../../../Services/ValidationService'
import { TForm } from '../../Form/Form'
import { TTextKey } from '../Card'
import styles from './Fields.module.scss'
import cn from 'classnames'

interface IMyTextInput {
  value: string
  placeholder?: string
  label: string
  name: TTextKey
  onChange: (val: { value: string; key: TTextKey }) => void
  control: Control<TForm, any>
  userId: string
  required?: boolean
  validator?: (val: string) => null | string
  type?: string
}

const MyTextInput: FC<IMyTextInput> = ({
  value,
  onChange,
  label,
  name,
  validator,
  userId,
  required,
  type,
}) => {
  const { handleError, errors } = useContext(ValidationContext)

  const [touched, setTouched] = useState(false)
  const field = `${userId}${name}`

  useEffect(() => {
    if (validator && touched) {
      const validMessage = validator(value)
      if (typeof validMessage !== 'string') {
        handleError({ action: 'убрать', field })
      } else {
        handleError({
          action: 'добавить',
          message: validMessage,
          field,
        })
      }
    }
  }, [value, touched])

  const err = errors[field]
  const curType = type ?? 'text'
  return (
    <div className={styles.field_container}>
      <label>{label}</label>
      <input
        className={cn(styles.field, {
          [styles.err]: !!err,
        })}
        value={value}
        type={curType}
        onChange={(e) => {
          if (err && validator) {
            const validMessage = validator(e.target.value)
            if (typeof validMessage !== 'string') {
              handleError({ action: 'убрать', field })
            } else {
              handleError({
                action: 'добавить',
                message: validMessage,
                field,
              })
            }
          }
          onChange({ value: e.target.value, key: name })
        }}
        onBlur={() => {
          setTouched(true)
        }}
        onFocus={() => {
          setTouched(false)
        }}
        required={required}
      />
      {err ? <div className={styles.error}>{err}</div> : null}
    </div>
  )
}

export default MyTextInput
