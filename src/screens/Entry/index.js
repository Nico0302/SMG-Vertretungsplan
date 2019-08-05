import React, { Component } from 'react';
import { View, ScrollView, StatusBar } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import moment from 'moment';
import { Appbar, Surface, Headline } from 'react-native-paper';
import { shareEntry } from '@services/share';
import { indicators, indicatorStatusBar } from '@config/theme';
import Info from './Info';
import styles from './styles';

class Entry extends Component {
    render() {
        const { navigation, isFocused } = this.props;
        const entry = navigation.getParam('entry');
        const { classes, lesson, type, date, subject, substitute, room, swap, detail } = entry;

        return (
            <View style={[styles.container, { backgroundColor: indicators[type] }]}>
                {isFocused && (<StatusBar backgroundColor={indicatorStatusBar[type]} barStyle="light-content" />)}
                <Appbar.Header style={styles.appbar}>
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
                        <Headline style={styles.lessonText}>{lesson}</Headline>
                    </View>
                    <Headline>{type}</Headline>
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

export default withNavigationFocus(Entry);