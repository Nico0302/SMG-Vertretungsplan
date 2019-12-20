import { Share, Linking, Platform } from 'react-native';
import moment from 'moment';

/**
 * Call native text share api to share an timetable entry. 
 * 
 * @param {Object} entry
 * @returns {Promise} Resolves after sharing
 */
export function shareEntry({
  date,
  type,
  classes,
  lesson,
  subject,
  substitute,
  room,
  swap,
  detail
}) {
  try {
    let message = `📅 ${moment(date).format('ddd D.M')}
${classes.join(',')} 📕 ${subject} 
🕒 ${lesson}. Stunde 
${type} `;
    if (swap) {
      message += `️➡️ ${swap}. Stunde `;
    }
    if (substitute) {
      message += `\n👤 ${substitute} `;
    }
    if (room) {
      message += `\n🚪 ${room} `;
    }
    if (detail) {
      message += `\nℹ️ (${detail}) `;
    }
    message += '\nSMG-Vertretungsplan App';
    Share.share({ message });
  } catch (error) {
    console.error(error);
  }
}

/**
 * Open default email app.
 * 
 * @param {String} address 
 * @param {String} [subject]
 * @param {String} [body]
 */
export function openMail(address, subject, body) {
  let url = 'mailto:' + address;

  if (subject || body)
    url += Platform.OS === 'ios' ? '?cc=' : '?';

  if (subject) {
    url += `subject=${encodeURIComponent(subject)}`;
  }

  if (body) {
    url += `&body=${encodeURIComponent(body)}`;
  }

  console.log(url)

  Linking.openURL(url);
}
