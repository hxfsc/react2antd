import { combineReducers } from "redux"

import num from "@/reducers/num"
import user from "@/reducers/user"
import saga from "@/reducers/saga"



const rootReducers = combineReducers({ num, user,saga })

export default rootReducers
