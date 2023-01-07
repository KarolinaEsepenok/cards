import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './CommonButton.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string
}
export const CommonButton: React.FC<SuperButtonPropsType> = ({
  xType,
  className,
  disabled,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  const finalClassName =
    s.button +
    (disabled ? ' ' + s.disabled : '') +
    (xType === 'red' ? ' ' + s.red : '') +
    (xType === 'secondary' ? ' ' + s.secondary : '') +
    (xType === 'default' ? ' ' + s.default : '')

  return (
    <button
      disabled={disabled}
      className={finalClassName}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />
  )
}
