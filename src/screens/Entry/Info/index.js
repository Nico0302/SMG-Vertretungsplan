import React, { PureComponent } from 'react';
import { List, withTheme } from 'react-native-paper';
import color from 'color';
import styles from './styles';

class Info extends PureComponent {
    render() {
        const { value, label, theme, icon, ...props } = this.props;
        const descriptionColor = color(theme.colors.text)
            .alpha(0.54)
            .rgb()
            .string();

        return (
            <List.Item
                {...props}
                titleStyle={{ color: descriptionColor }}
                descriptionStyle={[styles.description, { color: theme.colors.text }]}
                title={label}
                description={value}
                left={props => <List.Icon {...props} icon={icon} />}
            />
        )
    }
}

export default withTheme(Info);