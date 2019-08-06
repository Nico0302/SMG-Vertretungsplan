import { StyleSheet } from 'react-native';
import theme from '@config/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface
    },
    appbar: {
        zIndex: 10,
        elevation: 4
    },
    emptySection: {
        alignItems: 'center',
        padding: 4
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
