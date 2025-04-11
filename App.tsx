/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {Component, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Appearance,
  Button,
} from 'react-native';

import LegacyComponent from './src/LegacyComponent';

type SectionProps = React.PropsWithChildren<{
  title: string;
}>;

class Section extends Component<SectionProps> {
  render() {
    const {children, title} = this.props;

    return (
      <View style={styles.sectionContainer}>
        <Text
          style={[
            styles.sectionTitle,
          ]}>
          {title}
        </Text>
        <Text
          style={[
            styles.sectionDescription,
          ]}>
          {children}
        </Text>
      </View>
    );
  }
}

const App = () => {
  const [interval, setNewInterval] = useState<number>(1);

  return (
    <SafeAreaView>
      <StatusBar/>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View
          style={{
            padding: 20,
          }}>
          <Section title="ServiceMax">
            Legacy component testbed
          </Section>
          <Button onPress={() => setNewInterval(old => old+1)} title={"Increase interval"} />
          <LegacyComponent heartbeatInterval={interval} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
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
