/*
 *
 * ManageUsers reducer
 *
 */

import { fromJS } from 'immutable';
import * as CONSTANTS from './constants'
export const initialState = fromJS({});

function manageUsersReducer(state = initialState, action) {
  switch (action.type) {
    case CONSTANTS.GET_USERS_SUCCESS:
      return Object.assign({},state,{users:action.response.data.data})
    case CONSTANTS.GET_USERS_FAILURE:
      return Object.assign({},state, {usersFailure:action.error})
    case CONSTANTS.GET_ALL_ROLES_SUCCESS:
      return Object.assign({},state,{roles:action.response.data.data})
    case CONSTANTS.GET_ALL_ROLES_FAILURE:
      return Object.assign({},state, {rolesFailure:action.error})
    case CONSTANTS.CREATE_USER_SUCCESS:
      return Object.assign({},state,{createUserSuccess:action.response.data})
    case CONSTANTS.CREATE_USER_FAILURE:
      return Object.assign({},state,{createUserFailure: action.error})
    default:
      return state;
  }
}

export default manageUsersReducer;
