import { SELECTION_ALL } from "antd/lib/table/hooks/useSelection"
import { all } from "redux-saga/effects"

function* helloWord() {
    console.log("saga.....")
}


function* rootSaga() {
    yield all([
        helloWord()
    ])
}

export default rootSaga