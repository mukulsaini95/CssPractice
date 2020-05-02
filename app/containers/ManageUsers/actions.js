/*
 *
 * ManageUsers actions
 *
 */

import * as CONSTANTS from './constants'
export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export function createUser(payload) {
  return {
    type: CONSTANTS.CREATE_USER,
    payload
  };
}

export function getAllUsers() {
  console.log("getAllUsers")
  return {
    type: CONSTANTS.GET_USERS
  }
}
export function getAllRoles() {
  console.log("getting roles")
  return {
    type: CONSTANTS.GET_ALL_ROLES
  }
}
