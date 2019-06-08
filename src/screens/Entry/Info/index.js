import React, { PureComponent } from 'react';
import { List } from 'react-native-paper';
import color from 'color';
import theme from '@config/theme';
import styles from './styles';

class Info extends PureComponent {
    render() {
        const { value, label, icon, ...props } = this.props;
        const descriptionColor = color(theme.colors.text)
            .alpha(0.54)
            .rgb()
            .string();

        return (
            <List.Item
                {...props}
                titleStyle={[styles.title, { color: descriptionColor }]}
                descriptionStyle={styles.description}
                title={label}
                description={value}
                left={props => <List.Icon {...props} icon={icon} />}
            />
        )
    }
}

export default Info;