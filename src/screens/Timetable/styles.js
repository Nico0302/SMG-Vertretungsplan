import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    appbar: {
        elevation: Platform.OS === 'ios' ? 0 : 4
    },
    emptySection: {
        alignItems: 'center',
        padding: 4
    },
    emptyList: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 80
    },
    snackbarListPadding: {
        paddingBottom: 68
    },
    info: {
        marginHorizontal: 16,
        marginBottom: 8
    }
});

export default styles;
