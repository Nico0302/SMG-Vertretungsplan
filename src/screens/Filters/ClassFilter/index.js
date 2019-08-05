import React, { PureComponent } from 'react';
import { List, Chip } from 'react-native-paper';
import styles from './styles';

class ClassFilter extends PureComponent {
    render() {
        const {  }

        return (
            <List.Item
                title="First Item"
                description={() => (<Chip>5g</Chip>)}
                left={props => <List.Icon {...props} icon="folder" />}
            />
        );
    }
}

export default ClassFilter;