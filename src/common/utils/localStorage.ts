export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('currentPage')

    if (serializedState === null) {
      return undefined
    }

    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}
export const saveState = (state: any) => {
  //(store.getState().packs.queryParams)=> {
  try {
    const serializedState = JSON.stringify({
      packs: {
        queryParams: state.packs.queryParams,
      },
    })

    // const serializedState = JSON.stringify(state.packs.queryParams.page)
    // const serializedState = JSON.stringify(store.getState().packs.queryParams)

    localStorage.setItem('currentPage', serializedState)
    // eslint-disable-next-line no-empty
  } catch (err) {}
}
