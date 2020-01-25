import React, { PureComponent } from 'react';
import { View, FlatList } from 'react-native';
import moment from 'moment';
import color from 'color';
import {
    Appbar,
    Subheading,
    DataTable,
    Text,
    withTheme
} from 'react-native-paper';
import timeData from '@config/times.json';
import styles from './styles';

const timeArray = Object.keys(timeData).map(lesson => ({
    start: timeData[lesson][0],
    end: timeData[lesson][1],
    lesson
}));

class Times extends PureComponent {
    static navigationOptions = {
        drawerLabel: 'Zeiten'
    };

    renderItem = ({ item: { lesson, start, end }, index }) => {
        const { theme } = this.props;
        const active = this._now.isBetween(
            moment(start, 'hh:mm'),
            moment(end, 'hh:mm')
        );
        const backgroundColor = color(theme.colors.primary)
            .alpha(0.12)
            .rgb()
            .string();
        const contentColor = active
            ? theme.colors.primary
            : color(theme.colors.text)
                  .alpha(0.68)
                  .rgb()
                  .string();
        return (
            <DataTable.Row
                style={[
                    index % 2 === 0 ? styles.evenRow : {},
                    active ? styles.activeRowWrapper : {}
                ]}>
                <View
                    style={[
                        active
                            ? [
                                  {
                                      backgroundColor,
                                      borderRadius: theme.roundness
                                  },
                                  styles.activeRow
                              ]
                            : {},
                        styles.row
                    ]}>
                    <DataTable.Cell style={styles.lesson}>
                        <Subheading style={{ color: contentColor }}>
                            {lesson}
                        </Subheading>
                    </DataTable.Cell>
                    <DataTable.Cell>
                        <Text
                            style={{
                                color: contentColor
                            }}>{`${start} Uhr`}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                        <Text
                            style={{
                                color: contentColor
                            }}>{`${end} Uhr`}</Text>
                    </DataTable.Cell>
                </View>
            </DataTable.Row>
        );
    };

    render() {
        const { navigation, theme } = this.props;

        this._now = moment();

        return (
            <View
                style={[
                    styles.container,
                    { backgroundColor: theme.colors.surface }
                ]}>
                <Appbar.Header>
                    <Appbar.Action
                        icon="menu"
                        onPress={navigation.openDrawer}
                    />
                    <Appbar.Content title="Zeiten" />
                </Appbar.Header>
                <FlatList
                    data={timeArray}
                    renderItem={this.renderItem}
                    ListHeaderComponent={
                        <DataTable.Header>
                            <DataTable.Title style={styles.lesson}>
                                Stunde
                            </DataTable.Title>
                            <DataTable.Title>Anfang</DataTable.Title>
                            <DataTable.Title>Ende</DataTable.Title>
                        </DataTable.Header>
                    }
                    keyExtractor={item => item.lesson}
                />
            </View>
        );
    }
}

export default withTheme(Times);
