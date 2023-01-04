
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
// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута, кроме type
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
    // и + ещё пропсы которых нет в стандартном инпуте
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
        ...restProps // все остальные пропсы попадут в объект restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e) // если есть пропс onChange, то передать ему е (поскольку onChange не обязателен)
        onChangeText?.(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress?.(e)

        onEnter && // если есть пропс onEnter
        e.key === 'Enter' && // и если нажата кнопка Enter
        onEnter() // то вызвать его
    }

    const finalSpanClassName = s.error
        + (spanClassName ? ' ' + spanClassName : '')
    const finalInputClassName = s.input
        + (error ? ' ' + s.errorInput : ' ' + s.superInput)
        + (className ? ' ' + s.className : '') // задача на смешивание классов
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
