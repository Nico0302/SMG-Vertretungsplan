import React, { PureComponent } from 'react';
import { View, SectionList, RefreshControl, InteractionManager, StatusBar, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import color from 'color';
import {
  Appbar,
  Paragraph,
  Snackbar,
  List,
  Subheading,
  Caption,
  overlay,
  withTheme
} from 'react-native-paper';
import { fetchTimetables } from '@actions/timetables';
import Entry from './Entry';
import styles from './styles';

class Timetable extends PureComponent {
  constructor(props) {
    super(props);

    this.updateTimetables = this.updateTimetables.bind(this);
    this.onEntryDetail = this.onEntryDetail.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.renderSections = this.renderSections.bind(this);
  }

  static navigationOptions = {
    drawerLabel: 'Vertretungsplan'
  };

  componentDidMount() {
    SplashScreen.hide();
    InteractionManager.runAfterInteractions(() =>
      this.updateTimetables()
    );
  }

  updateTimetables() {
    const { auth, isLoading, fetchTimetables, navigation } = this.props;

    if (auth.username && auth.password) {
      if (!isLoading) {
        fetchTimetables().catch(() => { });
      }
    } else {
      navigation.navigate('Unauthenticated');
    }
  }

  onEntryDetail({ section, item }) {
    const { navigation } = this.props;

    navigation.navigate('Entry', {
      entry: {
        ...item,
        date: section.date
      }
    });
  }

  renderItem({ item, section }) {
    return (
      <Entry
        {...item}
        onPress={() => this.onEntryDetail({ item, section })}
      />
    );
  }

  renderSections() {
    const { sections, filters, isLoading, error, theme } = this.props;
    const { height } = Dimensions.get('window');

    const progressBackgroundColor = overlay(12, theme.colors.surface);

    return (
      <SectionList
        sections={sections}
        contentContainerStyle={error ? styles.snackbarListPadding : {}}
        renderItem={this.renderItem}
        renderSectionHeader={({ section: { title, info } }) => (
          <View>
            <List.Subheader>{title}</List.Subheader>
            {info && <Paragraph style={styles.info}>{info}</Paragraph>}
          </View>
        )}
        renderSectionFooter={({ section }) =>
          <View>
            {section.data.length < 1 && (
              <View style={styles.emptySection}>
                <Subheading>
                  {'keine Einträge' + (filters.isActive ? ` für die Klasse ${filters.class}` : '')}
                </Subheading>
              </View>
            )}
            {section.index + 1 >= sections.length && (
              <Caption style={styles.disclaimer}>
                Das SMG und die Betreiber des DSBs übernehmen keine Haftung für Vollständigkeit und Richtigkeit.
              </Caption>
            )}
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={this.updateTimetables}
            progressBackgroundColor={progressBackgroundColor}
            colors={[theme.colors.primary]}
          />
        }
        ListEmptyComponent={(
          <View style={styles.emptyList}>
            <Icon
              name="event-busy"
              size={80}
              color={theme.colors.disabled}
            />
            <Subheading>
              Keine aktuellen Vertretungspläne
            </Subheading>
          </View>
        )}
        stickySectionHeadersEnabled={false}
        removeClippedSubviews
        keyExtractor={(item, index) => item.lesson + index.toString()}
        initialNumToRender={Math.floor(height / 52)}
        getItemLayout={(data, index) => {
          return { length: 52, offset: 52 * index, index };
        }}
      />
    );
  }

  render() {
    const { error, navigation, theme } = this.props;

    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.surface }]}>
        <Appbar.Header>
          <Appbar.Action icon="menu" onPress={navigation.openDrawer} />
          <Appbar.Content title="Vertretungsplan" />
        </Appbar.Header>
        {this.renderSections()}
        <Snackbar
          visible={error}
          onDismiss={() => { }}
          action={{
            label: 'neu laden',
            onPress: () => this.updateTimetables()
          }}>
          Offline
        </Snackbar>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  isLoading: state.timetables.isLoading,
  error: state.timetables.error,
  sections: state.timetables.sections,
  filters: state.timetables.filters,
  version: state.timetables.version
});

const mapDispatchToProps = {
  fetchTimetables
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTheme(Timetable));
