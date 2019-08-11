import React, { PureComponent } from 'react';
import { View, SectionList, RefreshControl, InteractionManager } from 'react-native';
import { connect } from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import {
  Appbar,
  Paragraph,
  Snackbar,
  List,
  Subheading,
  Surface
} from 'react-native-paper';
import theme from '@config/theme';
import { fetchTimetables } from '@actions/timetables';
import Entry from './Entry';
import styles from './styles';

class Timetable extends PureComponent {
  constructor(props) {
    super(props);

    this.updateTimetables = this.updateTimetables.bind(this);
    this.onEntryDetail = this.onEntryDetail.bind(this);
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

    if (auth.token) {
      if (!isLoading) {
        fetchTimetables().catch(error => {});
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

  renderSections() {
    const { sections, filters, isLoading, error } = this.props;

    return (
      <SectionList
        initialNumToRender={11}
        sections={sections}
        contentContainerStyle={error ? styles.snackbarListPadding : {}}
        renderItem={({ item, section }) => (
          <Entry
            {...item}
            onPress={() => this.onEntryDetail({ item, section })}
          />
        )}
        renderSectionHeader={({ section: { title, info } }) => (
          <View>
            <List.Subheader>{title}</List.Subheader>
            {info && <Paragraph style={styles.info}>{info}</Paragraph>}
          </View>
        )}
        renderSectionFooter={({ section }) =>
          section.data.length < 1 ? (
            <View style={styles.emptySection}>
              <Subheading>
                {'keine Einträge' + (filters.isActive ? ` für die Klasse ${filters.class}` : '')}
              </Subheading>
            </View>
          ) : null
        }
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={this.updateTimetables}
            colors={[theme.colors.primary]}
          />
        }
        stickySectionHeadersEnabled={false}
        keyExtractor={(item, index) => item.lesson + index.toString()}
        getItemLayout={(data, index) => {
          return { length: 52, offset: 52 * index, index };
        }}
      />
    );
  }

  render() {
    const { error, navigation } = this.props;

    return (
      <View style={styles.container}>
        <Surface style={styles.appbar}>
          <Appbar.Header>
            <Appbar.Action icon="menu" onPress={navigation.openDrawer} />
            <Appbar.Content title="Vertretungsplan" />
          </Appbar.Header>
        </Surface>
        {this.renderSections()}
        <Snackbar
          visible={error}
          onDismiss={() => {}}
          action={{
            label: 'neu laden',
            onPress: () => this.updateTimetables()
          }}
        >
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
  filters: state.timetables.filters
});

const mapDispatchToProps = {
  fetchTimetables
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timetable);
