import { takeEvery, put } from "redux-saga/effects"


function* incrementAsync() {
    put({ type: "INCREMENT" })
}

function* watchIncrementAsync() {
    yield takeEvery("INCREMENTASYNC", incrementAsync)
}

export { watchIncrementAsync }