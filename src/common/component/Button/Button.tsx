import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './Button.module.scss'

type DefaultButtonType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type ButtonType = DefaultButtonType & {
  styleType?: 'primary' | 'secondary' | 'warn'
}
export const Button: React.FC<ButtonType> = ({
  styleType,
  className,
  disabled,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  const finalClassName = `${s.default} ${styleType && s[styleType]} ${className && className} ${
    disabled ? disabled : ''
  }`.trim()

  return (
    <button
      disabled={disabled}
      className={finalClassName}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />
  )
}
