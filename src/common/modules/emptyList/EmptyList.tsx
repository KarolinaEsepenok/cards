import React from 'react'

import s from 'pages/packs/Packs.module.scss'

export const EmptyList = () => {
  return (
    <div className={s.resultsNotFound}>
      <h2>Sorry, we couldn&apos;t find any results</h2>
    </div>
  )
}
