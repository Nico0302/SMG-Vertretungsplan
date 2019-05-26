import cheerio from 'react-native-cheerio';

class UntisParser {
    constructor(data) {
        this._$ = cheerio.load(data);
        this.timetables = [];
        this.parse();
    }

    parse() {
        this._$('table[class=mon_list]').each((index, timetable) =>
            this.parseTimetable(index, timetable)
        );
    }

    parseTimetable(timetableIndex, timetable) {
        this.timetables.push([]);
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
            const value = this._$(cell).text().trim();
            const columProperties = timetableColumns[index];

            if (columProperties.mandatory && value === '')
                throw new Error('Missing mandatory value!');

            entry[columProperties.key] = columProperties.value ?
                columProperties.value(value) : value;
        });

        if (Object.keys(entry).length > 0)
            this.timetables[timetableIndex].push(entry);
    }
}

const timetableColumns = [
    {
        key: 'date',
        value: value => {
            const now = new Date();
            const date = value + now.getFullYear();
            return date
        }
    },
    {
        key: 'classes',
        value: value => value.split(', '),
        mandatory: true
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
        key: 'swap'
    },
    {
        key: 'detail'
    }
];

export default UntisParser;