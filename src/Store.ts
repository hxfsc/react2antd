import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import createSagaMiddleware from "redux-saga"
import rootReducers from "@/reducers/index"

const sagaMiddleware = createSagaMiddleware()


const epicMiddleware = createEpicMiddleware()

const store = createStore(rootReducers, composeWithDevTools(applyMiddleware(thunk), applyMiddleware(epicMiddleware)))

sagaMiddleware.run()

export default store
