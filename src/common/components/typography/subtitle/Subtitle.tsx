import { FC, ReactNode } from 'react'

import s from './Subtitle.module.scss'

type SubtitleType = {
  children: ReactNode
}

export const Subtitle: FC<SubtitleType> = ({ children }) => {
  return <h3 className={s.subtitle}>{children}</h3>
}
