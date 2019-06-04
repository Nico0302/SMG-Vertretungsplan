import { StyleSheet } from 'react-native';
import theme from '@config/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.surface
    },
    appbar: {
        elevation: 4
    },
    content: {
        flex: 1
    },
    deactivatedItem: {
        opacity: 0.6,
    },
    activeDescription: {
        color: theme.colors.primary
    },
    leftSpacer: {
        width: 56
    }
});

export default styles;