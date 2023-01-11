import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './Button.module.scss'

type DefaultButtonType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type ButtonType = DefaultButtonType & {
  xType?: string
}
export const Button: React.FC<ButtonType> = ({
  xType,
  className,
  disabled,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  const finalClassName = `${s.default} ${xType && s[xType]} ${className && className} ${
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
