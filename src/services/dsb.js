const loginUrl = 'https://iphone.dsbcontrol.de/iPhoneService.svc/DSB/authid/';
const timetableUrl = 'https://iphone.dsbcontrol.de/iPhoneService.svc/DSB/timetables/';

/**
 * Fetch an auth token from the DSB api.
 * 
 * @param {String} username 
 * @param {String} password 
 * @returns {Promise<String>} Promise object represents the auth token
 */
export async function getToken(username, password) {
  const response = await fetch(`${loginUrl}${username}/${password}`, {
    method: 'GET'
  });
  const token = await response.json();

  if (token === '00000000-0000-0000-0000-000000000000') {
    throw new Error('Login failed.');
  }

  return token;
}

/**
 * Fetch all timetable urls from the DSB api.
 * 
 * @param {String} token
 * @returns {Promise<Object>} Promise object represents api response
 */
export async function getTimetables(token) {
  const response = await fetch(timetableUrl + token);
  const timetables = await response.json();

  return timetables;
}
