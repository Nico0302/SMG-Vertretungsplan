import React, { PureComponent } from 'react';
import {
    Button,
    Dialog,
    Paragraph,
    Portal,
    withTheme
} from 'react-native-paper';

class LogoutDialog extends PureComponent {
    render() {
        const { visible, onDismiss, onConfirm } = this.props;

        return (
            <Portal>
                <Dialog visible={visible} onDismiss={onDismiss}>
                    <Dialog.Title>Abmelden?</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>
                            Alle Einstellungen und Anmeldedaten werden
                            zurückgesetzt.
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={onDismiss}>Abbruch</Button>
                        <Button onPress={onConfirm}>Abmelden</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        );
    }
}

export default withTheme(LogoutDialog);
