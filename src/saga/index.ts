import { SELECTION_ALL } from "antd/lib/table/hooks/useSelection"
import { all } from "redux-saga/effects"

import { watchIncrementAsync, incrementAsync } from "./base"

function* helloWord() {
    console.log("saga.....")
}


function* rootSaga() {
    yield all([
        helloWord(),
        watchIncrementAsync,
        incrementAsync
    ])
}

export default rootSaga