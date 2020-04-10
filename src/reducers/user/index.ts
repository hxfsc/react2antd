export enum actionsUserConstants {
  USER_LOGIN = "user/login",
  USER_LOGOUT = "user/logout"
}

export interface IUser {
  name: string
  password: string
}

export const login = (data: IUser) => {
  return {
    type: actionsUserConstants.USER_LOGIN,
    data
  }
}

export const logout = () => {
  return {
    type: actionsUserConstants.USER_LOGOUT,
    data: {}
  }
}

export interface IActionLogin { type: actionsUserConstants.USER_LOGIN, data: IUser }
export interface IActionLogout { type: actionsUserConstants.USER_LOGOUT, data: {} }
export type ActionUserType = IActionLogin | IActionLogout

const initialState = {}

const reducer = (state = initialState, action: ActionUserType) => {

  switch (action.type) {
    case actionsUserConstants.USER_LOGIN: {
      const { data: newState } = action
      return Object.assign({}, state, newState)
    }
    case actionsUserConstants.USER_LOGOUT: {
      const { data: newState } = action
      return newState
    }

    default:
      return state
  }
}

export default reducer


