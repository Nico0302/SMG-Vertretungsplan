import { StyleSheet } from 'react-native';
import theme from '@config/theme';

const styles = StyleSheet.create({
    title: {
        color: theme.colors.disabled
    },
    description: {
        color: theme.colors.text,
        fontSize: 16
    }
});

export default styles;