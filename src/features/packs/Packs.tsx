import React, { useEffect } from 'react'

import { Button } from '../../common/component/Button/Button'
import { useAppDispatch } from '../../common/hooks/useAppDispatch'
import { useAppSelector } from '../../common/hooks/useAppSelector'
import {
  cardPacks,
  maxCardsCountSelector,
  minCardsCountSelector,
  packNameSelector,
  pageCountSelector,
  pageSelector,
  sortPacksSelector,
  userIdSelector,
} from '../../common/selectors/Selectors'

import s from './Packs.module.scss'
import { PackType } from './packsApi'
import { AddNewPack } from './packsList/addNewPack/AddNewPack'
import { getPacksTC } from './packsReducer'
import { PacksTable } from './packsTable/PacksTable'

export const Packs = () => {
  const packs: PackType[] = useAppSelector(cardPacks)
  const page = useAppSelector(pageSelector)
  const packName = useAppSelector(packNameSelector)
  const pageCount = useAppSelector(pageCountSelector)
  const userId = useAppSelector(userIdSelector)
  const minCardsCount = useAppSelector(minCardsCountSelector)
  const maxCardsCount = useAppSelector(maxCardsCountSelector)
  const sortPacks = useAppSelector(sortPacksSelector)

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getPacksTC())
  }, [page, packName, pageCount, userId, minCardsCount, maxCardsCount, sortPacks])

  return (
    <section className={s.packs}>
      <h2>Packs list</h2>

      <div>
        <Button styleType="primary">Add new pack</Button>
        <AddNewPack />
      </div>

      <div className={s.table}>
        <PacksTable packs={packs} />
      </div>
    </section>
  )
}
