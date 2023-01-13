import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  useEffect,
  useState,
} from 'react'

import visibilityOff from '../../../assets/img/icons/visibility-off.svg'
import visibilityOn from '../../../assets/img/icons/visibility-on.svg'
import { Button } from '../Button/Button'

import s from './Input.module.scss'
type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
  type: string
  label?: string
  error?: string
  textChange?: boolean
  textChangeBtnCallback?: (e: any) => void
}
export const Input: React.FC<SuperInputTextPropsType> = ({
  type,
  label,
  error,
  textChange,
  textChangeBtnCallback,
  ...restProps
}) => {
  const [typeLabel, setTypeLabel] = useState(type)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [currentValue, setCurrentValue] = useState('')

  const inputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(e.currentTarget.value)
  }
  const togglePasswordVisible = () => {
    setPasswordVisible(!passwordVisible)
  }
  const textChangeBtnCallbackHandle = () => {
    textChangeBtnCallback?.(currentValue)
  }

  useEffect(() => {
    passwordVisible ? setTypeLabel('text') : setTypeLabel(type)
  }, [passwordVisible])

  return (
    <>
      <div className={s.inputContainer}>
        {label && (
          <label htmlFor={label} className={s.label}>
            {label}
          </label>
        )}
        <input
          value={currentValue}
          type={typeLabel}
          className={s.input}
          id={label}
          onChange={inputOnChange}
          {...restProps}
        />
        {type === 'password' && (
          <span>
            <img
              alt="password visibility icon"
              className={s.visibilityIcon}
              src={passwordVisible ? visibilityOff : visibilityOn}
              onClick={togglePasswordVisible}
            />
          </span>
        )}
        {textChange && (
          <Button
            styleType="primary"
            className={s.saveButton}
            onClick={textChangeBtnCallbackHandle}
          >
            SAVE
          </Button>
        )}
      </div>
      {error && <p className={s.error}>{error}</p>}
    </>
  )
}
