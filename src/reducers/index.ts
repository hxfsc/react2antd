import { combineReducers } from "redux"

import num from "@/reducers/num"
import user from "@/reducers/user"


import { counter } from "@/epics/conuter"


const rootReducers = combineReducers({ num, user, counter })
export type reduxStateType = ReturnType<typeof rootReducers>

export default rootReducers
