import { takeEvery, put } from "redux-saga/effects"


function* incrementAsync() {
   yield put({type: "INCREMENT"})
}

function* watchIncrementAsync() {
    yield takeEvery("INCREMENTASYNC", incrementAsync)
}

export { watchIncrementAsync, incrementAsync }