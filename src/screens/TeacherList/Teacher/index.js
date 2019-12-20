import React, { PureComponent } from 'react';
import { List, Title } from 'react-native-paper';
import styles from './styles';

class Teacher extends PureComponent {
    render() {
        const { id, name, subjects, onPress } = this.props;

        return (
            <List.Item
                style={styles.container}
                title={name}
                onPress={onPress}
                description={subjects.join(', ')}
                left={props => <Title style={styles.id}>{id}</Title>}
            />
        );
    }
}

export default Teacher;
