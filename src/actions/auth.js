import { getToken } from '@services/dsb';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';

export function login(username, password) {
    return async dispatch => {
        try {
            dispatch({
                type: LOGIN_REQUEST
            });
            if (!username)
                throw new Error('Ungültiger Nutzername!');
            if (!password)
                throw new Error('Ungültiges Passwort!');
            const token = await getToken(username, password);
            dispatch({
                type: LOGIN_SUCCESS,
                token
            });
        } catch(error) {
            dispatch({
                type: LOGIN_FAILURE,
                error
            });
        }
    };
};

export const logout = () => ({
    type: 'LOGOUT'
});