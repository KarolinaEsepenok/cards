import React, {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  ReactNode,
  useState,
} from 'react'

//import { Visibility } from '@mui/icons-material'

import s from './Input.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
  type: string
  label?: string
}
export const Input: React.FC<SuperInputTextPropsType> = ({ type, label, ...restProps }) => {
  const finalClassName = `${s.default}`

  const [passwordVisible, setPasswordVisible] = useState(false)
  const changePasswordVisible = () => setPasswordVisible(!passwordVisible)

  return (
    <div className={s.inputContainer}>
      {label && (
        <label htmlFor={label} className={s.label}>
          {label}
        </label>
      )}
      <input type={type} className={finalClassName} id={label} {...restProps} />
      {type === 'password' && (
        <span>
          {/*<Visibility />*/}
          <p onClick={changePasswordVisible}>ICON</p>
        </span>
      )}
    </div>
  )
}

// type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
//   onChangeText?: (value: string) => void
//   onEnter?: () => void
//   error?: ReactNode
//   spanClassName?: string
//   showEye?: boolean
//   type?: string
// }
// export const Input: React.FC<SuperInputTextPropsType> = ({
//   type,
//   onChange,
//   onChangeText,
//   onKeyUp,
//   onEnter,
//   error,
//   className,
//   spanClassName,
//
//   showEye,
//   ...restProps
// }) => {
//   const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
//     onChange?.(e)
//     onChangeText?.(e.currentTarget.value)
//   }
//   const onKeyUpCallback = (e: KeyboardEvent<HTMLInputElement>) => {
//     onKeyUp?.(e)
//     onEnter && e.key === 'Enter' && onEnter()
//   }
//
//   const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName : ''}`
//   const finalInputClassName = `${s.superInput} ${error ? s.errorInput : className}`
//
//   const [show, setShow] = useState(false)
//   const toggleShow = () => setShow(!show)
//
//   return (
//     <div className={s.inputBox}>
//       {type === 'password' && <div className={show ? s.eyeSlash : s.eye} onClick={toggleShow} />}
//       <input
//         type={type === 'password' && !show ? 'password' : 'text'}
//         onChange={onChangeCallback}
//         onKeyUp={onKeyUpCallback}
//         className={finalInputClassName}
//         {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
//       />
//       {error && <span className={finalSpanClassName}>{error}</span>}
//     </div>
//   )
// }
