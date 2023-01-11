import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

import s from './Button.module.scss'

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string
  text: string
}
export const Button: React.FC<SuperButtonPropsType> = ({
  xType,
  className,
  disabled,
  ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
}) => {
  // const finalClassName =
  //   s.button +
  //   (disabled ? ' ' + s.disabled : '') +
  //   (xType === 'red' ? ' ' + s.red : '') +
  //   (xType === 'secondary' ? ' ' + s.secondary : '') +
  //   (xType === 'default' ? ' ' + s.default : '')
  const finalClassName = ` ${s.button} ${xType === 'default' ? ' ' + s.default : ''} 
  ${xType === 'red' ? ' ' + s.red : ''} 
  ${xType === 'secondary' ? ' ' + s.secondary : ''}
   ${disabled ? ' ' + s.disabled : ''}
   ${className}`

  return (
    // <button
    //   disabled={disabled}
    //   className={finalClassName}
    //   {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    // />
    <button
      disabled={disabled}
      className={finalClassName}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    >
      {restProps.text}
    </button>
  )
}
