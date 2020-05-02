import { take,takeEvery, call, put, select } from 'redux-saga/effects';
import axios from 'axios'
import * as CONSTANTS from './constants'
import {GET_USERS_SUCCESS} from "./constants";

export function* getUsersApiAsyncHandler() {
  try {
    const response = yield call(axios.get, window.URL +"api/v1/user")
    console.log("response",response)
    yield put({type: CONSTANTS.GET_USERS_SUCCESS,response})
  }catch (e) {
    console.log("exception while fetching users",e)
    yield put({type: CONSTANTS.GET_USERS_FAILURE, error: e})
  }

}
export function* getRolesApiAsyncHandler() {
  try {
    const response = yield call(axios.get, window.URL +"api/v1/role")
    console.log("response",response)
    yield put({type: CONSTANTS.GET_ALL_ROLES_SUCCESS,response})
  }catch (e) {
    console.log("exception while fetching roles",e)
    yield put({type: CONSTANTS.GET_ALL_ROLES_FAILURE, error: e})
  }

}
export function* createUserApiAsyncHandler(action) {
  try {
    const response = yield call(axios.post, window.URL +"api/v1/user",action.payload)
    console.log("response",response)
    yield put({type: CONSTANTS.CREATE_USER_SUCCESS,response})
  }catch (e) {
    console.log("exception while creating user",e)
    yield put({type: CONSTANTS.CREATE_USER_FAILURE, error: e})
  }
}

export function* watchGetUserRequest() {
  yield takeEvery(CONSTANTS.GET_USERS, getUsersApiAsyncHandler)
}

export function* watchGetRolesRequest() {
  yield takeEvery(CONSTANTS.GET_ALL_ROLES, getRolesApiAsyncHandler)
}
export function* watchSaveUserRequest() {
  yield takeEvery(CONSTANTS.CREATE_USER, createUserApiAsyncHandler)
}

export default function* defaultSaga() {
  yield [
    watchGetUserRequest(),
    watchGetRolesRequest(),
    watchSaveUserRequest(),
  ]
}

