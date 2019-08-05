import React, { PureComponent } from 'react';
import { TextInput } from 'react-native';
import { Button, Dialog, Portal, withTheme } from 'react-native-paper';
import styles from './styles';

class FilterDialog extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            filter: ''
        };

        this.onCreate = this.onCreate.bind(this);
    }

    onCreate() {
        const { onCreate } = this.props;
        const { filter } = this.state;

        onCreate(filter === '' ? null : filter.replace(/\s/g, ''));
        this.setState({ filter: '' });
    }

    render() {
        const { visible, onDismiss, theme } = this.props;
        const { filter } = this.state;

        return (
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={onDismiss}>
                    <Dialog.Title style={styles.title}>Filter</Dialog.Title>
                    <TextInput
                        style={styles.input}
                        label="Filter"
                        placeholder="10g"
                        value={filter}
                        autoCorrect={false}
                        maxLength={8}
                        onChangeText={filter => this.setState({ filter })}
                        onSubmitEditing={this.onCreate}
                        underlineColorAndroid={theme.colors.primary}
                    />
                    <Dialog.Actions>
                        <Button onPress={onDismiss}>Abbruch</Button>
                        <Button onPress={this.onCreate}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        );
    }
}

export default withTheme(FilterDialog);