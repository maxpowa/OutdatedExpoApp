import React, {Component} from 'react';
import {
  type RegistrationId,
  register,
  deregister,
} from './third-party-black-box';
import { View, Text, Button } from 'react-native';

export type LegacyComponentProps = {
  connectionParameters: number;
};

export type LegacyComponentState = {
  requestCount: number;
  connectionId: RegistrationId | undefined;
};

export default class LegacyComponent extends Component<
  LegacyComponentProps,
  LegacyComponentState
> {
  state = {
    requestCount: 0,
    connectionId: undefined,
  };

  resetHeartbeat() {
    this.setState({
      requestCount: 0,
    });
  }

  receiveRequest() {
    this.setState({
      requestCount: this.state.requestCount + 1,
    });
  }

  setupConnection() {
    this.setState({
      connectionId: register(
        this.receiveRequest.bind(this),
        this.props.connectionParameters,
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
    if (this.props.connectionParameters !== prevProps.connectionParameters) {
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
        <Text style={{marginTop: 10}}>Count: {this.state.requestCount}</Text>
      </View>
    );
  }
}
