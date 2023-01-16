import React from 'react'

import { PacksFilterMyAll } from '../../../features/packs/PacksFilterMyAll'

import { PaginationTable } from './PaginationTable'

export const TestPagination = () => {
  return (
    <div>
      <PaginationTable />
      <PacksFilterMyAll />
    </div>
  )
}
