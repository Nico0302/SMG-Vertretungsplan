import moment from 'moment';
import { LOGOUT } from '@actions/auth';
import { MIGRATE_VERSION } from '@actions/settings';
import {
    TOGGLE_FILTER,
    SET_CLASS_FILTER,
    ADD_SUBJECT_FILTER,
    REMOVE_SUBJECT_FILTER
} from '@actions/filters';
import {
    FETCH_TIMETABLES_REQUEST,
    FETCH_TIMETABLES_FAILURE,
    FETCH_TIMETABLES_SUCCESS,
    TOGGLE_HIDE_PAST
} from '@actions/timetables';
import filters from '@reducers/filters';

function generateSections(timetables, filters, hidePast) {
    if (timetables) {
        return timetables
            .filter(
                timetable =>
                    !hidePast || moment().diff(timetable.date, 'days') <= 0
            )
            .map((timetable, index) => ({
                ...timetable,
                // format date as title
                title: moment(timetable.date).format('dddd, DD.MM.YYYY'),
                index,
                // check if filter exists and is active
                data:
                    filters.isActive && !filters.isEmpty
                        ? // apply filter
                          timetable.data.filter(
                              entry =>
                                  entry.classes.find(
                                      className =>
                                          className.toLowerCase() ===
                                          filters.class.toLowerCase()
                                  ) &&
                                  (!entry.subject ||
                                      filters.subjects.length < 1 ||
                                          filters.subjects.find(
                                              subject =>
                                                  entry.subject
                                                      .toLowerCase()
                                                      .replace(
                                                          /[_\-\s]/g,
                                                          ''
                                                      ) ===
                                                  subject
                                                      .toLowerCase()
                                                      .replace(/[_\-\s]/g, '')
                                          ))
                          )
                        : timetable.data
            }));
    }
    return [];
}

function timetables(
    state = {
        isLoading: false,
        isEmpty: true,
        hidePast: false,
        filters: filters(),
        cache: null,
        url: null,
        sections: [],
        receivedAt: moment().toISOString()
    },
    action
) {
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
                    sections: generateSections(
                        action.timetables,
                        state.filters,
                        state.hidePast
                    ),
                    url: action.url,
                    receivedAt: action.receivedAt
                };
            }
            return {
                ...state,
                isLoading: false,
                sections: generateSections(
                    state.cache,
                    state.filters,
                    state.hidePast
                ),
                receivedAt: action.receivedAt
            };
        case FETCH_TIMETABLES_FAILURE:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                receivedAt: action.receivedAt
            };
        case TOGGLE_FILTER:
        case SET_CLASS_FILTER:
        case ADD_SUBJECT_FILTER:
        case REMOVE_SUBJECT_FILTER:
            const nextFilterState = filters(state.filters, action);

            return {
                ...state,
                sections: generateSections(
                    state.cache,
                    nextFilterState,
                    state.hidePast
                ),
                filters: nextFilterState
            };
        case TOGGLE_HIDE_PAST:
            return {
                ...state,
                sections: generateSections(
                    state.cache,
                    state.filters,
                    !state.hidePast
                ),
                hidePast: !state.hidePast
            };
        case LOGOUT:
            return {
                ...state,
                filters: filters(state.filters, action),
                cache: null,
                sections: [],
                url: null,
                isEmpty: true,
                hidePast: false
            };
        case MIGRATE_VERSION:
            if (!action.version || action.version < 3)
                return {
                    ...state,
                    isEmpty: true,
                    filters: filters(),
                    cache: null,
                    url: null,
                    sections: []
                };
            return state;
        default:
            return state;
    }
}

export default timetables;
