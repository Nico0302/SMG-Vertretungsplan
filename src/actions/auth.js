import { getToken } from '@services/dsb';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

/**
 * Login into the DSB api and require an auth token.
 *
 * @param {String} username
 * @param {String} password
 * @returns {Promise<String>} Promise object represents the auth token
 */
export function login(username, password) {
  return async dispatch => {
    try {
      dispatch({
        type: LOGIN_REQUEST,
      });
      if (!username) {
        throw new Error('Ungültiger Nutzername!');
      }
      if (!password) {
        throw new Error('Ungültiges Passwort!');
      }
      const token = await getToken(username, password);
      dispatch({
        type: LOGIN_SUCCESS,
        token,
      });
      return token;
    } catch (error) {
      dispatch({
        type: LOGIN_FAILURE,
        error,
      });
    }
  };
}

/**
 * Logout and clear all personal data.
 */
export const logout = () => ({
  type: LOGOUT,
});
