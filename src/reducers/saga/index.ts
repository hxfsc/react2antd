const initState = 10

export const deIncrement = (state) => {
  return state - 1
}

export const increment = (state) => {
  return state + 1
}

const reducer = (state = initState, action) => {
  // return {
  //   "INCREMENT": increment(state),
  //   "DEINCREMENT": deIncrement(state),
  // }[action.type]

  switch (action.type) {
    case "INCREMENT":
      return increment(state)
    case "DEINCREMENT":
      return deIncrement(state)
    default:
      return state
  }
}

export default reducer
