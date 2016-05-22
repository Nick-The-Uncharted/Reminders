// @flow

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions,
  StatusBar,
} from 'react-native';

import ReminderNavigator from './ReminderNavigator'

export class Reminders extends Component {
    constructor(props: any) {
        super(props)
    }

    onPress() {
        console.log('hello');
    }
    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    hidden={false}
                    backgroundColor="#4E4E4E"
                    barStyle="light-content"
                />
                <ReminderNavigator />
              </View>
        );
   }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  }
});
