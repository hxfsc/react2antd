import { combineEpics } from "redux-observable"

import { epic as epicConuter, epic1 as epicConuter1 } from "./conuter/index"


const epics = combineEpics(epicConuter, epicConuter1)
export { epics }
