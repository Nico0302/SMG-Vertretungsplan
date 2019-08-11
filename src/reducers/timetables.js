import moment from 'moment';
import {
    LOGOUT
} from '@actions/auth';
import {
    TOGGLE_FILTER,
    SET_CLASS_FILTER,
    ADD_SUBJECT_FILTER,
    REMOVE_SUBJECT_FILTER
} from '@actions/filters';
import {
    FETCH_TIMETABLES_REQUEST,
    FETCH_TIMETABLES_FAILURE,
    FETCH_TIMETABLES_SUCCESS
} from '@actions/timetables';
import filters from '@reducers/filters';

function generateSections(timetables, filters) {
    if (timetables) {
        return timetables.map(timetable => ({
            ...timetable,
            // format date as title
            title: moment(timetable.date).format('dddd, DD.MM.YYYY'),
            // check if filter exists and is active
            data: filters.isActive && !filters.isEmpty ?
                // apply filter
                timetable.data.filter(entry => 
                    entry.classes.find(className =>
                        className.toLowerCase() === filters.class.toLowerCase()
                    ) && (!entry.subject || (filters.subjects.length < 1 || filters.subjects.includes(entry.subject)))
                )
                : timetable.data
        }));
    }
    return [];
}

function timetables(state = {
    isLoading: false,
    isEmpty: true,
    filters: filters(),
    cache: null,
    url: null,
    sections: []
}, action) {
    switch (action.type) {
        case FETCH_TIMETABLES_REQUEST:
            return {
                ...state,
                isLoading: true,
                error: null
            };
        case FETCH_TIMETABLES_SUCCESS:
            if (action.timetables) {
                return {
                    ...state,
                    isLoading: false,
                    isEmpty: action.timetables.length < 1,
                    cache: action.timetables,
                    sections: generateSections(action.timetables, state.filters),
                    url: action.url,
                    receivedAt: action.receivedAt
                };
            }
            return {
                ...state,
                isLoading: false,
                sections: generateSections(state.cache, state.filters),
                receivedAt: action.receivedAt
            };
        case FETCH_TIMETABLES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error
            };
        case TOGGLE_FILTER:
        case SET_CLASS_FILTER:
        case ADD_SUBJECT_FILTER:
        case REMOVE_SUBJECT_FILTER:
            const nextFilterState = filters(state.filters, action);

            return {
                ...state,
                sections: generateSections(state.cache, nextFilterState),
                filters: nextFilterState
            };
        case LOGOUT:
            return {
                ...state,
                filters: filters(state.filters, action),
                cache: null,
                sections: [],
                url: null,
                receivedAt: null,
                isEmpty: true
            };
        default:
            return state;
    }
}

export default timetables;