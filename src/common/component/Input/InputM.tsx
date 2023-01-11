import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FocusEvent,
  InputHTMLAttributes,
  KeyboardEvent,
} from 'react'

import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type InputType = Omit<DefaultInputPropsType, 'type'> & {
  id: string
  label: string
  callBack?: () => void
  error?: string | undefined
  onChangeText?: (value: string) => void
  touchedEmail?: boolean
  touchedPassword?: boolean
}
export const InputM: React.FC<InputType> = ({
  label,
  callBack,
  id,
  onChange,
  onChangeText,
  onBlur,
}) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const passwordLabel = label === 'Password'
  const password = showPassword ? 'text' : 'password'
  const visibility = showPassword ? <VisibilityOff /> : <Visibility />

  const adornment = (
    <InputAdornment position="end">
      <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
        {passwordLabel ? visibility : ''}
      </IconButton>
    </InputAdornment>
  )

  const onKeyPressHandler = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      callBack && callBack()
    }
  }
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    onChangeText?.(e.currentTarget.value)
  }
  const onBlurCallback = (e: FocusEvent<HTMLInputElement>) => {
    onBlur?.(e)
  }

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
      <InputLabel htmlFor="standard-adornment-password">{label}</InputLabel>
      <Input
        id={id}
        type={passwordLabel ? password : 'text'}
        endAdornment={passwordLabel ? adornment : ''}
        onKeyPress={onKeyPressHandler}
        onChange={onChangeCallback}
        onBlur={onBlurCallback}
      ></Input>
    </FormControl>
  )
}
