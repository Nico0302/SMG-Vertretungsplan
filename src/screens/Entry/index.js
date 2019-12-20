import React, { Component } from 'react';
import { View, ScrollView, StatusBar, Platform } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import moment from 'moment';
import color from 'color';
import {
    Appbar,
    Surface,
    Headline,
    Colors,
    withTheme
} from 'react-native-paper';
import { shareEntry } from '@services/share';
import teachers from '@config/teachers.json';
import times from '@config/times.json';
import { indicators, indicatorStatusBar } from '@config/theme';
import InfoItem from '@components/InfoItem';
import styles from './styles';

class Entry extends Component {
    _getTime(lesson) {
        const lessons = lesson.split(' - ');
        if (lessons[0] && times[lessons[0]]) {
            let time = times[lessons[0]][0] + ' - ';
            if (lessons[1] && times[lessons[1]]) {
                time += times[lessons[1]][1];
            } else {
                time += times[lessons[0]][1];
            }
            return time;
        }
        return null;
    }

    render() {
        const { navigation, isFocused, theme } = this.props;
        const entry = navigation.getParam('entry');
        const {
            classes,
            lesson,
            type,
            date,
            subject,
            substitute,
            room,
            swap,
            detail
        } = entry;
        let indicatorColor = indicators[type]
            ? indicators[type]
            : indicators.default;
        if (theme.dark)
            indicatorColor = color(indicatorColor)
                .darken(0.3)
                .rgb()
                .string();
        let statusBarColor =
            Platform.OS === 'ios'
                ? indicatorColor
                : indicatorStatusBar[type] || indicatorStatusBar.default;
        if (theme.dark)
            statusBarColor = color(statusBarColor)
                .darken(0.3)
                .rgb()
                .string();
        const titleColor = color(indicatorColor).isDark()
            ? Colors.white
            : theme.dark
            ? Colors.black
            : theme.colors.text;
        
        const displayTime = this._getTime(lesson);

        return (
            <View
                style={[styles.container, { backgroundColor: indicatorColor }]}>
                {isFocused && (
                    <StatusBar
                        backgroundColor={statusBarColor}
                        barStyle={
                            color(statusBarColor).isDark()
                                ? 'light-content'
                                : 'dark-content'
                        }
                    />
                )}
                <Appbar.Header
                    style={[
                        styles.appbar,
                        { backgroundColor: indicatorColor }
                    ]}>
                    <Appbar.BackAction
                        onPress={() => navigation.goBack(null)}
                    />
                    <Appbar.Content title="" />
                    <Appbar.Action
                        icon="share-variant"
                        onPress={() => shareEntry(entry)}
                    />
                </Appbar.Header>
                <View style={styles.backdrop}>
                    <View style={styles.lessonContainer}>
                        <Headline
                            style={[styles.lessonText, { color: titleColor }]}>
                            {lesson}
                        </Headline>
                    </View>
                    <Headline style={{ color: titleColor }}>{type}</Headline>
                </View>
                <Surface style={styles.surface}>
                    <ScrollView bounces={false}>
                        <InfoItem
                            value={moment(date).format('dddd, DD.MM.YYYY')}
                            label="Datum"
                            icon="calendar"
                        />
                        {classes && classes[0] !== '' && (
                            <InfoItem
                                value={classes.join(', ')}
                                label={
                                    classes.length > 1 ? 'Klassen' : 'Klasse'
                                }
                                icon="account-multiple"
                            />
                        )}
                        {subject && (
                            <InfoItem
                                value={subject}
                                label="Fach"
                                icon="book-variant"
                            />
                        )}
                        {substitute && (
                            <InfoItem
                                value={
                                    teachers[substitute]
                                        ? teachers[substitute].name
                                        : substitute
                                }
                                label="Lehrer/in"
                                icon="account"
                                onPress={teachers[substitute].name ? () => navigation.navigate('Teacher', { teacher: substitute }) : null}
                            />
                        )}
                        {room && (
                            <InfoItem value={room} label="Raum" icon="map-marker" />
                        )}
                        {swap && (
                            <InfoItem
                                value={`von ${swap}. Stunde`}
                                label="Verlegung"
                                icon="reply"
                            />
                        )}
                        {detail && (
                            <InfoItem
                                value={detail}
                                label="Anmerkung"
                                icon="information"
                            />
                        )}
                        {displayTime && (
                            <InfoItem
                                value={displayTime}
                                label="Uhrzeit"
                                icon="clock"
                            />
                        )}
                    </ScrollView>
                </Surface>
            </View>
        );
    }
}

export default withNavigationFocus(withTheme(Entry));
