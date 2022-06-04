import React, { useState } from 'react'

type Props = {
  children: React.ReactNode
}

type Error = {
  message?: string
  action: 'убрать' | 'добавить'
  field: string
}

type ErrKey = {
  [key: string]: string
}

const initialState = {
  errors: {} as ErrKey,
  handleError: (err: Error) => {},
}

export const ValidationContext = React.createContext(initialState)

const ValidationService: React.FC<Props> = ({ children }) => {
  const [errors, setErrors] = useState<ErrKey>({})

  const handleError = (err: Error) => {
    switch (err.action) {
      case 'добавить': {
        const nextErrors = { ...errors, [err.field]: err.message ?? '' }
        setErrors(nextErrors)
        break
      }

      case 'убрать': {
        const nextErrors = { ...errors }
        delete nextErrors[err.field]
        setErrors(nextErrors)

        break
      }
      default:
        break
    }
  }

  return (
    <ValidationContext.Provider value={{ errors, handleError }}>
      {children}
    </ValidationContext.Provider>
  )
}

export default ValidationService
