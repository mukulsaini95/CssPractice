import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the manageUsers state domain
 */

const selectManageUsersDomain = state => state.get('manageUsers', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManageUsers
 */

export const getUsersList=()=> createSelector(selectManageUsersDomain,substate=>substate.users)

export const getRolesLIst = () => createSelector(selectManageUsersDomain, substate => substate.roles)

export const createUser = () => createSelector(selectManageUsersDomain, substate => substate.createUserSuccess)
const makeSelectManageUsers = () =>
  createSelector(selectManageUsersDomain, substate => substate.toJS());

export default makeSelectManageUsers;
export { selectManageUsersDomain };
