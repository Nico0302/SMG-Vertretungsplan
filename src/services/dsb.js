const loginUrl = 'https://iphone.dsbcontrol.de/iPhoneService.svc/DSB/authid/';
const timetableUrl =
  'https://iphone.dsbcontrol.de/iPhoneService.svc/DSB/timetables/';

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

export async function getTimetables(token) {
  const response = await fetch(timetableUrl + token);
  const timetables = await response.json();

  return timetables;
}
