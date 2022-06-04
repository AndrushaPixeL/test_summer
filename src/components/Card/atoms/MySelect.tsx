import { FC } from 'react'
import { TTextKey } from '../Card'
import styles from './Fields.module.scss'

interface IMySelect {
  children: JSX.Element[]
  label: string
  name: TTextKey
  onChange: (val: { value: string; key: TTextKey }) => void
}

const MySelect: FC<IMySelect> = (props) => {
  return (
    <div className={styles.field_container}>
      <label htmlFor={props.name}>{props.label}</label>
      <select
        {...props}
        className={styles.field}
        onChange={(e) => {
          props.onChange({ value: e.target.value, key: props.name })
        }}
      />
    </div>
  )
}

export default MySelect
