import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    appbar: {
        elevation: Platform.OS === 'ios' ? 0 : 4
    },
    content: {
        flex: 1
    },
    deactivatedItem: {
        opacity: 0.6
    },
    leftSpacer: {
        width: 56
    },
    switch: {
        alignSelf: 'center',
        marginRight: 8
    }
});

export default styles;
