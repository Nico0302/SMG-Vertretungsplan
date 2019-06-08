import { Share } from 'react-native';
import moment from 'moment';


export function shareEntry({ date, type, classes, lesson, subject, substitute, room, swap, detail }) {
    try {
        let message = `${moment(date).format('dd, D.M')} ${lesson} ${subject} ${type} ${classes.join(',')}`;
        if (swap)
            message += ` ${swap}. Stunde`;

        Share.share({ message });
    } catch (error) {
        console.log(error);
    }
}