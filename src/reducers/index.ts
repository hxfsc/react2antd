import { combineReducers } from "redux"

import num from "@/reducers/num"
import user from "@/reducers/user"

const rootReducers = combineReducers({ num, user })
export type reduxStateType = ReturnType<typeof rootReducers>

export default rootReducers
