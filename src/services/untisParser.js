import cheerio from 'react-native-cheerio';
import moment from 'moment';

class UntisParser {
    constructor(data) {
        console.log(data);
        this._$ = cheerio.load(data);
        this.timetables = [];
        this.parse();
    }

    parse() {
        this._$('div[class=mon_title]').each((index, date) =>
            this.prepareTimetable(index, date)
        );
        this._$('table[class=mon_list]').each((index, timetable) =>
            this.parseTimetable(index, timetable)
        );
    }

    prepareTimetable(timetableIndex, dateElement) {
        const dateString = this._$(dateElement).text().split(' ')[0];
        const date = moment(dateString, 'D.M.YYYY').toISOString();

        this.timetables[timetableIndex] = { date, data: [] };
    }

    parseTimetable(timetableIndex, timetable) {
        this._$(timetable).find('tr').each((index, row) => {
            try {
                this.parseTimetableRow(timetableIndex, index, row);
            } catch(error) {
                if (error.message !== 'Missing mandatory value!')
                    throw error;
            }
        });
    }

    parseTimetableRow(timetableIndex, rowIndex, row) {
        let entry = {};

        this._$(row).find('td').each((index, cell) => {
            const plainValue = this._$(cell).text().trim();
            const columProperties = timetableColumns[index];

            if (!columProperties.ignore) {
                const value = columProperties.value ?
                        columProperties.value(plainValue) : plainValue;
                if (value)
                    entry[columProperties.key] = value;
            }
        });
        if (Object.keys(entry).length > 0)
            this.timetables[timetableIndex].data.push(entry);
    }
}

const timetableColumns = [
    {
        ignore: true
    },
    {
        key: 'classes',
        value: value => value.split(', ')
    },
    {
        key: 'lesson'
    },
    {
        key: 'subject'
    },
    {
        key: 'room',
        value: value => value === '---' ? null : value
    },
    {
        key: 'substitute',
        value: value => value === '---' ? null : value
    },
    {
        key: 'type'
    },
    {
        key: 'swap',
        value: value => value === '' ? null : value
    },
    {
        key: 'detail',
        value: value => value === '' ? null : value
    }
];

export default UntisParser;