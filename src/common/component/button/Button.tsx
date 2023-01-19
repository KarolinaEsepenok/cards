import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './Button.module.scss'

type DefaultButtonType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonType = DefaultButtonType & {
  styleType?: 'primary' | 'secondary' | 'warn' | 'icon'
}
export const Button: React.FC<ButtonType> = ({
  styleType,
  className,
  disabled,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  const finalClassName = `${styleType && s[styleType]} ${className && className} ${disabled ? s.disabled : ''}`.trim()

  return (
    <button
      disabled={disabled}
      className={finalClassName}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    >
      {restProps.children}
    </button>
  )
}