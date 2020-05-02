import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the manageSession state domain
 */

const selectManageSessionDomain = state =>
  state.get('manageSession', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by ManageSession
 */

export const login = () => createSelector(selectManageSessionDomain, substate => substate.loginResponse)
const makeSelectManageSession = () =>
  createSelector(selectManageSessionDomain, substate => substate);

export default makeSelectManageSession;
export { selectManageSessionDomain };
