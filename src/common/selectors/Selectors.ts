import { RootStateType } from 'app/store'

//app
export const isLoggedInSelector = (state: RootStateType) => state.app.isLoggedIn
export const isAppInitialize = (state: RootStateType) => state.app.isAppInitialized
export const isLoadingSelector = (state: RootStateType) => state.app.isLoading
export const errorSelector = (state: RootStateType) => state.app.error

//auth
export const emailSelector = (state: RootStateType) => state.auth.email
export const nameSelector = (state: RootStateType) => state.auth.name
export const avatarSelector = (state: RootStateType) => state.auth.avatar
export const myIdSelector = (state: RootStateType) => state.auth.id

//password
export const forgotPasswordSelector = (state: RootStateType) => state.password.forgotPassword
export const changePasswordSelector = (state: RootStateType) => state.password.changePasswordSuccess
export const currentEmailSelector = (state: RootStateType) => state.password.currentEmail

//register
export const registerSelector = (state: RootStateType) => state.register.register

//packs
export const cardPacks = (state: RootStateType) => state.packs.cardPacks
export const pageSelector = (state: RootStateType) => state.packs.queryParams.page
export const packNameSelector = (state: RootStateType) => state.packs.queryParams.packName
export const pageCountSelector = (state: RootStateType) => state.packs.queryParams.pageCount
export const userIdSelector = (state: RootStateType) => state.packs.queryParams.user_id
export const minCardsCountSelector = (state: RootStateType) => state.packs.minCardsCount
export const maxCardsCountSelector = (state: RootStateType) => state.packs.maxCardsCount
export const sortPacksSelector = (state: RootStateType) => state.packs.queryParams.sortPacks
export const minValueRangeSelector = (state: RootStateType) => state.packs.queryParams.min
export const maxValueRangeSelector = (state: RootStateType) => state.packs.queryParams.max
export const cardPacksTotalCountSelector = (state: RootStateType) => state.packs.cardPacksTotalCount
export const resetRange = (state: RootStateType) => state.packs.resetRange

//cards
export const cardsSelector = (state: RootStateType) => state.cards.cards
export const cardsPackName = (state: RootStateType) => state.cards.packName
export const cardCreatorId = (state: RootStateType) => state.cards.creatorId
