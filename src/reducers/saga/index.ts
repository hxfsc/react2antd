const initState = 10


export const increment = () => ({ type: "INCREMENT" })

export const deIncrement = (reload) => ({ type: "DEINCREMENT", reload })


const _increment = (state) => {
  return state - 1
}

const _deIncrement = (state, reload) => {
  console.log(reload)
  return state + reload
}

const reducer = (state = initState, action) => {

  switch (action.type) {
    case "INCREMENT":
      return _increment(state)
    case "DEINCREMENT":
      return _deIncrement(state, action.reload)
    default:
      return state
  }
}

export default reducer
