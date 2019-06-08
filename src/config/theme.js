import { DefaultTheme, Colors } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#99203B',
    accent: '#99203B',
  },
};

export const indicators = {
  'Entfall': Colors.red600,
  'Vertretung': Colors.cyan600,
  'Statt-Vertretung': Colors.cyan600,
  'Verlegung': Colors.deepPurple300,
  'Raum-Vtr.': Colors.amber500,
  'Pausenaufsicht': Colors.blueGrey200,
  'Betreuung': Colors.lightBlue500
};

export const indicatorStatusBar = {
  'Entfall': '#ab000d',
  'Vertretung': '#007c91',
  'Statt-Vertretung': '#007c91',
  'Verlegung': '#65499c',
  'Raum-Vtr.': '#c79100',
  'Pausenaufsicht': '#808e95',
  'Betreuung': '#007ac1'
}

export default theme;