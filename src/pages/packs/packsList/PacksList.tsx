import { PackActions } from './pack/actions/PackActions'
import { Pack } from './pack/Pack'
import s from './PackList.module.scss'

import arrowDown from 'assets/img/icons/table-sort-arrow-down.svg'
import arrowUp from 'assets/img/icons/table-sort-arrow-up.svg'
import { sortingPacksMethods } from 'common/constants/sortingPacksMethods/sortingMethods'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardPacks, myIdSelector, sortPacksSelector } from 'common/selectors/Selectors'
import { formatDate } from 'common/utils/formatDate'
import { sortPacksHelper } from 'common/utils/sortPacksHelper'

export const PacksList = () => {
  const packs = useAppSelector(cardPacks)
  const myId = useAppSelector(myIdSelector)
  const sortMethod = useAppSelector(sortPacksSelector)
  const dispatch = useAppDispatch()

  const arrowDirectionName =
    sortMethod === sortingPacksMethods.ascName ? <img src={arrowUp} alt="" /> : <img src={arrowDown} alt="" />
  const arrowDirectionCards =
    sortMethod === sortingPacksMethods.ascCardsCount ? <img src={arrowUp} alt="" /> : <img src={arrowDown} alt="" />
  const arrowDirectionDate =
    sortMethod === sortingPacksMethods.ascUpdate ? <img src={arrowUp} alt="" /> : <img src={arrowDown} alt="" />
  const arrowDirectionCreated =
    sortMethod === sortingPacksMethods.ascUserName ? <img src={arrowUp} alt="" /> : <img src={arrowDown} alt="" />

  const universalSort = (m1: sortingPacksMethods, m2: sortingPacksMethods) => {
    sortPacksHelper(dispatch, sortMethod, m1, m2)
  }

  const sortByName = () => {
    universalSort(sortingPacksMethods.desName, sortingPacksMethods.ascName)
  }

  const sortByCardsCount = () => {
    universalSort(sortingPacksMethods.desCardsCount, sortingPacksMethods.ascCardsCount)
  }

  const sortByUpdate = () => {
    universalSort(sortingPacksMethods.desUpdate, sortingPacksMethods.ascUpdate)
  }

  const sortByCreatorName = () => {
    universalSort(sortingPacksMethods.desUserName, sortingPacksMethods.ascUserName)
  }

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th className={`${s.title} ${s.name}`}>
            <span onClick={sortByName} className={s.sort}>
              Name {arrowDirectionName}
            </span>
          </th>

          <th className={`${s.title} ${s.cards}`}>
            <span onClick={sortByCardsCount} className={s.sort}>
              Cards {arrowDirectionCards}
            </span>
          </th>

          <th className={`${s.title} ${s.update}`}>
            <span onClick={sortByUpdate} className={s.sort}>
              Last Updated {arrowDirectionDate}
            </span>
          </th>

          <th className={`${s.title} ${s.creator}`}>
            <span onClick={sortByCreatorName} className={s.sort}>
              Created by {arrowDirectionCreated}
            </span>
          </th>

          <th className={`${s.title} ${s.actions}`}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {packs.map(p => {
          const dateUpdate = formatDate(p.updated)
          const myPack = p.user_id === myId

          return (
            <Pack
              key={p._id}
              packId={p._id}
              name={p.name}
              cardsCount={p.cardsCount}
              author={p.user_name}
              updated={dateUpdate}
              myPack={myPack}
              actions={
                <PackActions key={p._id} myPack={myPack} packId={p._id} name={p.name} cardsCount={p.cardsCount} />
              }
            />
          )
        })}
      </tbody>
    </table>
  )
}
