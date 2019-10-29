import { generateAppId } from '@services/dsb';
import { fetchTimetables } from '@actions/timetables';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

/**
 * Login into the DSB api and require an auth token.
 *
 * @param {String} username
 * @param {String} password
 * @returns {Promise<String>}
 */
export function login(username, password) {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const appId = state.auth.appId || generateAppId();
      
      dispatch({
        type: LOGIN_REQUEST,
        appId
      });

      if (!username) {
        throw new Error('Ungültiger Nutzername!');
      }
      if (!password) {
        throw new Error('Ungültiges Passwort!');
      }

      const response = await dispatch(fetchTimetables({ username, password, appId }));

      dispatch({
        type: LOGIN_SUCCESS,
        username,
        password
      });
      return response;
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        error,
      });
      throw error;
    }
  };
}

/**
 * Logout and clear all personal data.
 */
export const logout = () => ({
  type: LOGOUT,
});
