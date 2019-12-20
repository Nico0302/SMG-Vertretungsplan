import React, { Component } from 'react';
import { View, ScrollView, StatusBar, Clipboard } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import color from 'color';
import {
    Appbar,
    Surface,
    Headline,
    Colors,
    withTheme
} from 'react-native-paper';
import { openMail } from '@services/share';
import teachers from '@config/teachers.json';
import InfoItem from '@components/InfoItem';
import styles from './styles';

class Teacher extends Component {
    render() {
        const { navigation, isFocused, theme } = this.props;
        const id = navigation.getParam('teacher');
        const { name, email, subjects, special } = teachers[id];

        const backgroundColor = theme.dark
            ? theme.colors.background
            : theme.colors.primary;
        const statusBarColor = theme.colors.statusBarColor;
        const titleColor = color(backgroundColor).isDark()
            ? Colors.white
            : theme.dark
            ? Colors.black
            : theme.colors.text;

        return (
            <View style={[styles.container, { backgroundColor }]}>
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
                <Appbar.Header style={[styles.appbar, { backgroundColor }]}>
                    <Appbar.BackAction onPress={() => navigation.goBack()} />
                    <Appbar.Content title="" />
                </Appbar.Header>
                <View style={styles.backdrop}>
                    <View style={styles.lessonContainer}>
                        <Headline
                            style={[styles.lessonText, { color: titleColor }]}>
                            {id}
                        </Headline>
                    </View>
                </View>
                <Surface style={styles.surface}>
                    <ScrollView bounces={false}>
                        <InfoItem
                            value={name}
                            label="Name"
                            onPress={() =>
                                Clipboard.setString(name.split(', ')[0])
                            }
                            icon="account"
                        />
                        {subjects && (
                            <InfoItem
                                value={subjects.join(', ')}
                                label="Fächer"
                                icon="book-variant"
                            />
                        )}
                        {special && (
                            <InfoItem
                                value={special}
                                label="Info"
                                icon="information"
                            />
                        )}
                        {email && (
                            <InfoItem
                                value={email}
                                label="E-Mail"
                                icon="email"
                                onPress={() => openMail(email)}
                            />
                        )}
                    </ScrollView>
                </Surface>
            </View>
        );
    }
}

export default withNavigationFocus(withTheme(Teacher));
