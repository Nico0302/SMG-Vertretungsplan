import React, { PureComponent } from 'react';
import { View, FlatList, TextInput } from 'react-native';
import color from 'color';
import { Appbar, Colors, withTheme } from 'react-native-paper';
import teacherData from '@config/teachers.json';
import Teacher from './Teacher';
import styles from './styles';

const teacherArray = Object.keys(teacherData).map(id => ({
    ...teacherData[id],
    id
}));

class TeacherList extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            search: null,
            teachers: teacherArray
        };

        this.onSearchChange = this.onSearchChange.bind(this);
    }

    static navigationOptions = {
        drawerLabel: 'Kollegium'
    };

    onSearchChange(search) {
        if (search === '') {
            this.setState({ search, teachers: teacherArray });
        } else {
            const query = search.toUpperCase().trim();

            const teachers = teacherArray.filter(
                ({ id, name }) =>
                    id.indexOf(query) > -1 ||
                    name.toUpperCase().indexOf(query) > -1
            );
            this.setState({ search, teachers });
        }
    }

    renderItem = ({ item }) => (
        <Teacher
            {...item}
            onPress={() =>
                this.props.navigation.navigate('Teacher', {
                    teacher: item.id
                })
            }
        />
    );

    render() {
        const { navigation, theme } = this.props;
        const { search } = this.state;
        const searchColor =
            color(theme.colors.primary).isDark() || theme.dark
                ? Colors.white
                : theme.colors.text;

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
                    {search !== null ? (
                        <TextInput
                            style={{
                                flex: 1,
                                color: searchColor,
                                fontSize: 16,
                                marginLeft: 16
                            }}
                            value={search}
                            onChangeText={this.onSearchChange}
                            selectionColor={searchColor}
                            underlineColorAndroid={searchColor}
                            autoFocus
                        />
                    ) : (
                        <Appbar.Content title="Kollegium" />
                    )}
                    {search !== null ? (
                        <Appbar.Action
                            icon="close"
                            onPress={() =>
                                this.setState({
                                    search: null,
                                    teachers: teacherArray
                                })
                            }
                        />
                    ) : (
                        <Appbar.Action
                            icon="magnify"
                            onPress={() => this.setState({ search: '' })}
                        />
                    )}
                </Appbar.Header>
                <FlatList
                    data={this.state.teachers}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    getItemLayout={(data, index) => {
                        return { length: 72, offset: 72 * index, index };
                    }}
                    removeClippedSubviews
                    keyboardShouldPersistTaps="always"
                />
            </View>
        );
    }
}

export default withTheme(TeacherList);
