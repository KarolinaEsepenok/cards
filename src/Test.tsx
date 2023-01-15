import React from 'react'

import { useAppSelector } from './common/hooks/useAppSelector'
import { Search } from './common/search/Search'

const Test = () => {
  const packs = useAppSelector(state => state.packs.isPacks)

  return <div>{packs ? <Search /> : <h2>Packs with this name doesn&apos;t exist</h2>}</div>
}

export default Test
