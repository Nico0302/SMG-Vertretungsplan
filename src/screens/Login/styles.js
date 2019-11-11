import { StyleSheet } from 'react-native';
import { Colors } from 'react-native-paper';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: 'center'
    },
    textInput: {
        width: '90%',
        maxWidth: 340,
        marginHorizontal: 8,
        marginBottom: 6
    },
    errorText: {
        color: Colors.red500,
        marginVertical: 8,
        textAlign: 'center'
    },
    logo: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 22
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 8,
        paddingBottom: 16
    }
});

export default styles;