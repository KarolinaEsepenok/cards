
import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    KeyboardEvent,
    ReactNode, useState,
} from 'react'
import s from './CommonInput.module.scss'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: ReactNode
    spanClassName?: string
    showEye?: boolean
    type?: string
}
export const CommonInput: React.FC<SuperInputTextPropsType> = (
    {
        type,
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
        className,
        spanClassName,

        showEye,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)
        onChangeText?.(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress?.(e)
        onEnter && e.key === 'Enter' && onEnter()
    }

  //  const finalSpanClassName = s.error + (spanClassName ? ' ' + spanClassName : '')
   // const finalInputClassName = s.input + (error ? ' ' + s.errorInput : ' ' + s.superInput)
     //   + (className ? ' ' + s.className : '')
    const finalSpanClassName = `${s.error} ${spanClassName ? spanClassName :''}`
    const finalInputClassName = `${s.superInput} ${error ? s.errorInput : className}`

    const [show, setShow] = useState(false)
    const toggleShow = () => setShow(!show)
    return (
        <div className={s.inputBox}>
            {type === 'password' && <div className={show ? s.eyeSlash : s.eye} onClick={toggleShow} />}
            <input
                type={type === 'password' && !show ? 'password' : 'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
           {error && <span className={finalSpanClassName}>{error}</span>}

        </div>
    )
}
