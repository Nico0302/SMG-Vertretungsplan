import React, { Component } from 'react';
import { View, ScrollView, StatusBar, Platform } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import moment from 'moment';
import color from 'color';
import { Appbar, Surface, Headline, Colors, withTheme } from 'react-native-paper';
import { shareEntry } from '@services/share';
import { indicators, indicatorStatusBar } from '@config/theme';
import Info from './Info';
import styles from './styles';

class Entry extends Component {
    render() {
        const { navigation, isFocused, theme } = this.props;
        const entry = navigation.getParam('entry');
        const { classes, lesson, type, date, subject, substitute, room, swap, detail } = entry;
        const indicatorColor = indicators[type] ? indicators[type] : indicators.default;
        const statusBarColor = Platform.OS === 'ios' ?
            indicatorColor :
            indicatorStatusBar[type] || indicatorStatusBar.default;
        const titleColor = color(indicatorColor).isDark() ? Colors.white : theme.colors.text;

        return (
            <View style={[styles.container, { backgroundColor: indicatorColor }]}>
                {isFocused && (
                    <StatusBar
                        backgroundColor={statusBarColor}
                        barStyle={color(statusBarColor).isDark() ? 'light-content' : 'dark-content'}
                    />
                )}
                <Appbar.Header style={[styles.appbar, { backgroundColor: indicatorColor }]}>
                    <Appbar.BackAction
                        onPress={() => navigation.goBack(null)}
                    />
                    <Appbar.Content title="" />
                    <Appbar.Action
                        icon="share"
                        onPress={() => shareEntry(entry)}
                    />
                </Appbar.Header>
                <View style={styles.backdrop}>
                    <View style={styles.lessonContainer}>
                        <Headline style={[styles.lessonText, { color: titleColor }]}>{lesson}</Headline>
                    </View>
                    <Headline style={{ color: titleColor }}>{type}</Headline>
                </View>
                <Surface style={styles.surface}>
                    <ScrollView bounces={false}>
                        <Info value={moment(date).format('dddd, DD.MM.YYYY')} label="Datum" icon="event"/>
                        {classes && classes[0] !== '' && (
                            <Info value={classes.join(', ')} label={classes.length > 1 ? 'Klassen' : 'Klasse'} icon="group"/>
                        )}
                        {subject && (
                            <Info value={subject} label="Fach" icon="class"/>
                        )}
                        {substitute && (
                            <Info value={substitute} label="Lehrer/in" icon="person"/>
                        )}
                        {room && (
                            <Info value={room} label="Raum" icon="room"/>
                        )}
                        {swap && (
                            <Info value={`von ${swap}. Stunde`} label="Verlegung" icon="reply"/>
                        )}
                        {detail && (
                            <Info value={detail} label="Anmerkung" icon="info"/>
                        )}
                    </ScrollView>
                </Surface>
            </View>
        );
    }
}

export default withNavigationFocus(withTheme(Entry));