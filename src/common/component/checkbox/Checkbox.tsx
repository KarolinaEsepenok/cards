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
  children, // в эту переменную попадёт текст, типизировать не нужно так как он затипизирован в React.FC
  id,

  ...restProps // все остальные пропсы попадут в объект restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeChecked?.(e.currentTarget.checked)
  }

  const finalInputClassName = s.checkbox + (className ? ' ' + className : '')

  return (
    <label className={s.label}>
      <input
        type="checkbox"
        onChange={onChangeCallback}
        className={finalInputClassName}
        {...restProps} // отдаём инпуту остальные пропсы если они есть (checked например там внутри)
      />
      {children && <span className={s.labelText}>{children}</span>}
    </label> // благодаря label нажатие на спан передастся в инпут
  )
}
