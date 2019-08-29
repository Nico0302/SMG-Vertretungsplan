import { DefaultTheme, Colors } from 'react-native-paper';

const themeDefault = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#99203B',
    accent: '#9e9e9e',
    statusBar: '#650016'
  }
};

const themeYellow = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ffc107',
    accent: '#9e9e9e',
    statusBar: '#c79100'
  }
};

const themeBlue = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3f51b5',
    accent: '#9e9e9e',
    statusBar: '#002984'
  }
};

const themeGreen = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#388e3c',
    accent: '#9e9e9e',
    statusBar: '#00600f'
  }
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
};

const themes = {
  default: themeDefault,
  yellow: themeYellow,
  blue: themeBlue,
  green: themeGreen
};

export default themes;