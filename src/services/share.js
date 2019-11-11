import { Share } from 'react-native';
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
