import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';
import theme from '@config/theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    textInput: {
        width: '90%',
        maxWidth: 300,
        marginBottom: 8
    },
    errorText: {
        color: Colors.red500,
        marginVertical: 8
    }
});

export default styles;