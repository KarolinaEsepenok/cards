import React, { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent } from 'react'

import { Visibility, VisibilityOff } from '@mui/icons-material'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>
type InputType = Omit<DefaultInputPropsType, 'type'> & {
  id: string
  label: string
  callBack?: () => void
  error: string | undefined
  onChangeText?: (value: string) => void
  touchedEmail?: boolean
  touchedPassword?: boolean
}
export const InputM: React.FC<InputType> = ({
  label,
  callBack,
  error,
  id,
  onChange,
  onChangeText,
  touchedPassword,
  touchedEmail,
}) => {
  const [showPassword, setShowPassword] = React.useState(false)
  const handleClickShowPassword = () => setShowPassword(show => !show)
  const passwordLabel = label === 'Password'
  const password = showPassword ? 'text' : 'password'
  const visibility = showPassword ? <VisibilityOff /> : <Visibility />
  const emailError = touchedEmail && error !== undefined ? error : ''
  const passwordError = touchedPassword && error !== undefined ? error : ''

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

  return (
    <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
      <InputLabel htmlFor={error ? error : label}>
        {error ? <span style={{ color: 'red' }}>{error}</span> : label}
      </InputLabel>
      <OutlinedInput
        id={id}
        type={passwordLabel ? password : 'text'}
        endAdornment={passwordLabel ? adornment : ''}
        label={error ? error : label}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        onChange={onChangeCallback}
      ></OutlinedInput>
    </FormControl>
  )
}
