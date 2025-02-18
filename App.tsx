/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Appearance,
} from 'react-native';

import LegacyComponent from './src/LegacyComponent';

type SectionProps = React.PropsWithChildren<{
  title: string;
}>;

class Section extends Component<SectionProps> {
  render() {
    const {children, title} = this.props;
    const isDarkMode = Appearance.getColorScheme() === 'dark';

    return (
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: isDarkMode ? '#FFF' : '#000',
            },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
            {
              color: isDarkMode ? '#FFF' : '#000',
            },
          ]}>
          {children}
        </Text>
      </View>
    );
  }
}

class App extends Component {
  render() {
    const isDarkMode = Appearance.getColorScheme() === 'dark';

    const backgroundStyle = {
      backgroundColor: isDarkMode ? '#000' : '#FFF',
    };

    return (
      <SafeAreaView style={backgroundStyle}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <View
            style={{
              backgroundColor: isDarkMode ? '#000' : '#DDD',
              padding: 20,
            }}>
            <Section title="ServiceMax">
              Legacy component testbed
            </Section>
            <LegacyComponent heartbeatInterval={1} />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    margin: 32,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
