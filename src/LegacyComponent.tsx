import React, {Component} from 'react';
import {
  type RegistrationId,
  register,
  deregister,
} from './third-party-black-box';
import { View, Text, Button } from 'react-native';

export type LegacyComponentProps = {
  heartbeatInterval: number;
};

export type LegacyComponentState = {
  beats: number;
  connectionId: RegistrationId | undefined;
};

export default class LegacyComponent extends Component<
  LegacyComponentProps,
  LegacyComponentState
> {
  state = {
    beats: 0,
    connectionId: undefined,
  };

  resetHeartbeat() {
    this.setState({
      beats: 0,
    });
  }

  receiveHeartbeat() {
    this.setState({
      beats: this.state.beats + 1,
    });
  }

  setupConnection() {
    this.setState({
      connectionId: register(
        this.receiveHeartbeat.bind(this),
        this.props.heartbeatInterval,
      ),
    });
  }

  destroyConnection() {
    if (this.state.connectionId) {
      deregister(this.state.connectionId);
      this.state.connectionId = undefined;
    }
  }

  componentDidMount() {
    this.setupConnection();
  }

  componentDidUpdate(
    prevProps: LegacyComponentProps,
    _prevState: LegacyComponentState,
  ) {
    if (this.props.heartbeatInterval !== prevProps.heartbeatInterval) {
      this.destroyConnection();
      this.setupConnection();
    }
  }

  componentWillUnmount() {
    this.destroyConnection();
  }

  render(): React.ReactNode {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Button 
          onPress={this.resetHeartbeat.bind(this)} 
          title='Reset count'
          color="#158484"
        />
        <Text style={{marginTop: 10}}>Count: {this.state.beats}</Text>
      </View>
    );
  }
}
