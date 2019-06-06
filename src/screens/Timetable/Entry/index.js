import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { TouchableRipple, Text, Title, Colors } from 'react-native-paper';
import color from 'color';
import theme from '@config/theme';
import styles from './styles';

const indicatorColors = {
    'Entfall': Colors.red600,
    'Vertretung': Colors.blue500,
    'Statt-Vertretung': Colors.blue500,
    'Raum-Vtr.': Colors.teal500,
    'Verlegung': Colors.orange500
}

class Entry extends PureComponent {
    simplifyClasses(classes) {
        let lastClassLevel = null;

        return classes.map(className => {
            const classLevel = className.match(/\d+/);

            if (classLevel && (classLevel[0] === lastClassLevel)) {
                lastClassLevel = classLevel[0];
                return className.match(/[a-zA-Z]/);
            }
            lastClassLevel = classLevel ? classLevel[0] : null;
            return className;
        });
    }

    render() {
        const { classes, lesson, room, subject, substitute, type, swap, detail, onPress } = this.props;
        const titleColor = color(theme.colors.text)
            .alpha(0.87)
            .rgb()
            .string();
        const descriptionColor = color(theme.colors.text)
            .alpha(0.54)
            .rgb()
            .string();
        const indicatorColor = indicatorColors[type] ? indicatorColors[type] : Colors.grey500;

        return (
            <TouchableRipple
                style={styles.container}
                onPress={onPress}
            >
                <View style={styles.row}>
                    <View style={[styles.lesson, { borderColor: indicatorColor }]}>
                        <Title style={{ color: titleColor }} >{lesson}</Title>
                    </View>
                    <View style={styles.content} pointerEvents="none">
                        <View style={styles.spaceRow} pointerEvents="none">
                            <View style={styles.row}>
                                {subject ? (
                                    <View style={styles.subject}>
                                        <Text style={[styles.title, { color: descriptionColor }]}>
                                            {subject + ' '}
                                        </Text>
                                    </View>
                                ) : null}
                                <Text style={[styles.title, { color: titleColor }]} >{type}</Text>
                            </View>
                            {classes && (
                                <Text style={[styles.classes, { color: descriptionColor }]}>
                                    {this.simplifyClasses(classes).join(', ')}
                                </Text>
                            )}
                        </View>
                        {((substitute && room) || (detail || swap)) && (
                            <View style={styles.spaceRow} pointerEvents="none">
                                {substitute && room && (
                                    <Text
                                        numberOfLines={1}
                                        style={[styles.description, { color: descriptionColor }]}
                                    >
                                        {`${substitute} in ${room}`}
                                    </Text>
                                )}
                                {(detail || swap) && (
                                    <Text
                                        numberOfLines={1}
                                        style={[styles.description, { color: descriptionColor }]}
                                    >
                                        {swap ? `von ${swap} Stunde` : detail}
                                    </Text>
                                )}
                            </View>
                        )}
                    </View>
                </View>
            </TouchableRipple>
        );
    }
}

export default Entry;