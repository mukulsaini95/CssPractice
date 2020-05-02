import { take, takeEvery, call, put, select } from 'redux-saga/effects';
import axios from 'axios';
import * as CONSTANTS from './constants'
// Individual exports for testing

export function* loginApiAsyncHandler(action) {
  try {
    const response = yield call(axios.post, window.URL + "api/v1/login", action.payload)
    yield put({ type: CONSTANTS.LOGIN_SUCCESS, response: response.data.data })
  } catch (e) {
    yield put({ type: CONSTANTS.LOGIN_FAILURE, error: e })
  }
}

export function* watchLoginRequest() {
  yield takeEvery(CONSTANTS.LOGIN, loginApiAsyncHandler)
}
export default function* defaultSaga() {
  yield [
    watchLoginRequest(),
  ]
}
