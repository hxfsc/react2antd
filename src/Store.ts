import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import rootReducers from "@/reducers/index"

import { createEpicMiddleware } from "redux-observable"

import { epics } from "@/epics/index"

const epicMiddleware = createEpicMiddleware()

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk), applyMiddleware(epicMiddleware)))

epicMiddleware.run(epics)

export default store
