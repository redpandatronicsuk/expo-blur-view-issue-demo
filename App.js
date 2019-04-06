import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { BlurView } from 'expo-blur'

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <BlurView intensity={100} style={[StyleSheet.absoluteFill, styles.blur]}>
          <Text>Not blurred</Text>
        </BlurView>
        
        <Text style={styles.instructions}>¿Blurred?</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  blur: {
    backgroundColor: 'rgba(255,0,0,.5)', // Also not applied, but when changing <BlurView>...</BlurView> to <View>...</View>, the style gets applied
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 100,
    flex: 1,
  }
});
