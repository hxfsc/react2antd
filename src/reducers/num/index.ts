export enum numConstants {
  ADD = "num/add",
  SUBTRACT = "num/subtract"
}

export const addAction = (data: number) => {
  return {
    type: numConstants.ADD,
    reload: data + 1
  }
}

export const subtractAction = (data: number) => {
  return {
    type: numConstants.SUBTRACT,
    reload: data - 1
  }
}


export interface IAdd { type: numConstants.ADD, reload: number }
export interface ISubtract { type: numConstants.SUBTRACT, reload: number }
export type numActionType = IAdd | ISubtract

const initialState = { count: 0 }
const reducer = (state = initialState, action: numActionType) => {
  switch (action.type) {
    case numConstants.ADD: {
      return Object.assign({}, state, { count: action.reload })
    }

    case numConstants.SUBTRACT: {
      return Object.assign({}, state, { count: action.reload })
    }

    default:
      return state
  }
}

export default reducer
