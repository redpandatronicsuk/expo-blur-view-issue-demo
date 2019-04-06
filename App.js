import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { BlurView } from 'expo-blur'
import { Audio } from 'expo-av'

const demoAudio = require('./assets/demo.mp3')

export default class App extends Component {

  state = {
    isAudioReady: false,
    isAudioPlaying: false
  }
  soundObj = null

  componentDidMount = async () => {
    await this.setupAudio()
  }

  setupAudio = async () => {
    await Audio.setIsEnabledAsync(true)
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: true,
      playsInSilentLockedModeIOS: true,
      playsInSilentModeIOS: true,
      interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
      shouldDuckAndroid: true,
      interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: true // Ignored on iOS 😭
    })
    this.soundObj = await Audio.Sound.createAsync(
      demoAudio,
      { shouldPlay: false }
    )
    this.setState({ isAudioReady: true })
  }

  togglePlayPause = async () => {
    const { isAudioPlaying } = this.state
    if (isAudioPlaying) {
      await this.soundObj.sound.pauseAsync()
      this.setState({ isAudioPlaying: false })
    } else {
      await this.soundObj.sound.playAsync()
      this.setState({ isAudioPlaying: true })
    }
  }

  render() {
    const { isAudioReady, isAudioPlaying } = this.state
    return (
      <View style={styles.container}>
        <BlurView intensity={100} style={[StyleSheet.absoluteFill, styles.blur]}>
          <Text>Not blurred</Text>
          {
            isAudioReady ?
            <TouchableOpacity onPress={this.togglePlayPause}>
              <Text>{ isAudioPlaying ? 'PAUSE' : 'PLAY' }</Text>
            </TouchableOpacity>
            :
            <ActivityIndicator />
          }
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
