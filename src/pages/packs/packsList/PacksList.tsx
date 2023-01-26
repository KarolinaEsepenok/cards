import { PackActions } from './pack/actions/PackActions'
import { Pack } from './pack/Pack'
import s from './PackList.module.scss'

import arrowDown from 'assets/img/icons/arrowDown.png'
import arrowUp from 'assets/img/icons/arrowUp.png'
import { sortingPacksMethods } from 'common/constants/sortingPacksMethods/sortingPacksMethods'
import { useAppDispatch } from 'common/hooks/useAppDispatch'
import { useAppSelector } from 'common/hooks/useAppSelector'
import { cardPacks, myIdSelector } from 'common/selectors/Selectors'
import { formatDate } from 'common/utils/formatDate'
import { sortHelper } from 'common/utils/sortHelper'

export const PacksList = () => {
  const packs = useAppSelector(cardPacks)
  const myId = useAppSelector(myIdSelector)
  const dispatch = useAppDispatch()

  const sortMethod = useAppSelector(state => state.packs.queryParams.sortPacks)
  const arrowDirectionName =
    sortMethod === sortingPacksMethods.ascName ? <img src={arrowUp} /> : <img src={arrowDown} />
  const arrowDirectionCards =
    sortMethod === sortingPacksMethods.ascCardsCount ? <img src={arrowUp} /> : <img src={arrowDown} />
  const arrowDirectionDate =
    sortMethod === sortingPacksMethods.ascUpdate ? <img src={arrowUp} /> : <img src={arrowDown} />
  const arrowDirectionCreated =
    sortMethod === sortingPacksMethods.ascUserName ? <img src={arrowUp} /> : <img src={arrowDown} />

  const universalSort = (m1: sortingPacksMethods, m2: sortingPacksMethods) => {
    sortHelper(dispatch, sortMethod, m1, m2)
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
            <span onClick={sortByName} className={s.cursor}>
              Name {arrowDirectionName}
            </span>
          </th>

          <th className={`${s.title} ${s.cards}`}>
            <span onClick={sortByCardsCount} className={s.cursor}>
              Cards {arrowDirectionCards}
            </span>
          </th>

          <th className={`${s.title} ${s.update}`}>
            <span onClick={sortByUpdate} className={s.cursor}>
              Last Updated {arrowDirectionDate}
            </span>
          </th>

          <th className={`${s.title} ${s.creator}`}>
            <span onClick={sortByCreatorName} className={s.cursor}>
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
              actions={<PackActions myPack={myPack} packId={p._id} name={p.name} cardsCount={p.cardsCount} />}
            />
          )
        })}
      </tbody>
    </table>
  )
}
