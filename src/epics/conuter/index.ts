import { map, delay } from "rxjs/operators"
import { ofType } from "redux-observable"
export const ADD = "counter/add"
export const MINUS = "counter/minus"
export const ASYNCADD = "counter/async/add"
export const ASYNCMINUS = "counter/async/minus"

export const add = () => ({ type: ADD })
export const minus = () => ({ type: MINUS })
export const asyncAdd = () => ({ type: ASYNCADD })
export const asyncMinus = () => ({ type: ASYNCMINUS })

export const epic = (action$) => action$.pipe(
  ofType(ASYNCADD),
  delay(2000),
  map(() => add())
)

export const epic1 = (action$) => action$.pipe(
  ofType(ASYNCMINUS),
  delay(2000),
  map(() => minus())
)


const initState = 12
export const counter = (state = initState, action) => {
  switch (action.type) {
    case ADD:
      console.log(state)
      return state + 1
    case MINUS:
      return state - 1
    default:
      return initState
  }
}
