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

        onCreate(filter);
        this.setState({ filter: '' });
    }

    render() {
        const { visible, title, createText, onDismiss, placeholder, theme } = this.props;
        const { filter } = this.state;

        return (
            <Portal>
                <Dialog
                    visible={visible}
                    onDismiss={onDismiss}>
                    <Dialog.Title style={styles.title}>{title}</Dialog.Title>
                    <TextInput
                        autoFocus
                        style={styles.input}
                        placeholder={placeholder}
                        value={filter}
                        autoCorrect={false}
                        maxLength={16}
                        onChangeText={filter => this.setState({ filter })}
                        onSubmitEditing={this.onCreate}
                        underlineColorAndroid={theme.colors.primary}
                    />
                    <Dialog.Actions>
                        <Button onPress={onDismiss}>Abbruch</Button>
                        <Button disabled={filter === ''} onPress={this.onCreate}>{createText}</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        );
    }
}

export default withTheme(FilterDialog);