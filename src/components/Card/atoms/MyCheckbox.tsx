import { FC } from 'react'
import styles from './Fields.module.scss'

interface IMyCheckbox {
  children: string
  onChange: (val: boolean) => void
  value: boolean
}

const MyCheckbox: FC<IMyCheckbox> = ({ children, onChange, value }) => {
  return (
    <div>
      <label>
        <input
          type='checkbox'
          className={styles.checkbox}
          checked={value}
          onChange={(e) => {
            onChange(e.target.checked)
          }}
        />
        {children}
      </label>
    </div>
  )
}

export default MyCheckbox
