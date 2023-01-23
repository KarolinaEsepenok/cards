import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react'

import s from './Checkbox.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type SuperCheckboxPropsType = Omit<DefaultInputPropsType, 'type'> & {
  onChangeChecked?: (checked: boolean) => void
  spanClassName?: string
}

export const Checkbox: React.FC<SuperCheckboxPropsType> = ({
  onChange,
  onChangeChecked,
  className,
  spanClassName,
  children,
  id,

  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeChecked?.(e.currentTarget.checked)
  }

  const finalInputClassName = s.checkbox + (className ? ' ' + className : '')

  return (
    <label className={s.label}>
      <input type="checkbox" onChange={onChangeCallback} className={finalInputClassName} {...restProps} />
      {children && <span className={s.labelText}>{children}</span>}
    </label>
  )
}
