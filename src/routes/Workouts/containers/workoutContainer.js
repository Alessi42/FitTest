import React, {Component} from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  PixelRatio,
  StatusBar,
  ActivityIndicator
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {increment, doubleAsync} from '../modules/workoutReducer'
import Video from 'react-native-video';
var Orientation = require('react-native-orientation');
var {height, width} = Dimensions.get('window');

const statusBarSize = 25;

class Workouts extends Component {
  state = {
      rate: 1,
      volume: 1,
      muted: false,
      resizeMode: 'contain',
      duration: 0.0,
      currentTime: 0.0,
      paused: true,
      buffering: false
    };

    video: Video;

    componentWillMount() {
      Orientation.lockToPortrait();
      StatusBar.setHidden(true);
      console.log("will")
      this.setState({ paused: false, buffering: true });
    }

    componentWillUnmount() {
      StatusBar.setHidden(false)
      Orientation.unlockAllOrientations();
    }

    onLoad = (data) => {
      this.setState({ duration: data.duration, buffering: false, paused: true });
    };

    onProgress = (data) => {
      if (this.state.buffering) {
        this.setState({ buffering: false })
      }
      this.setState({ currentTime: data.currentTime });
    };

    onEnd = () => {
      this.setState({ paused: true })
      this.video.seek(0)
    };

    onBuffer = () => {
      console.log("buff")
      this.setState({ buffering: true })
    };

    onAudioBecomingNoisy = () => {
      this.setState({ paused: true })
    };

    onAudioFocusChanged = (event: { hasAudioFocus: boolean }) => {
      this.setState({ paused: !event.hasAudioFocus })
    };

    getCurrentTimePercentage() {
      if (this.state.currentTime > 0) {
        return parseFloat(this.state.currentTime) / parseFloat(this.state.duration);
      }
      return 0;
    };

    render() {
      const flexCompleted = this.getCurrentTimePercentage() * 100;
      const flexRemaining = (1 - this.getCurrentTimePercentage()) * 100;

      return (
        <View
        style={{flex: 1, backgroundColor: "black"}}>
          <StatusBar hidden={true} />
          <View style={styles.topViewStyle}>
            <Video
              ref={(ref: Video) => { this.video = ref }}
              /* For ExoPlayer */
              source={{ uri: 'http://joeswebserver.uk.to/wo1.mp4' }}
              // source={require('./broadchurch.mp4')}
              style={styles.videoStyle}
              rate={this.state.rate}
              paused={this.state.paused}
              volume={this.state.volume}
              muted={this.state.muted}
              resizeMode={this.state.resizeMode}
              onLoad={this.onLoad}
              onProgress={this.onProgress}
              onEnd={this.onEnd}
              onBuffer={this.onBuffer}
              onAudioBecomingNoisy={this.onAudioBecomingNoisy}
              onAudioFocusChanged={this.onAudioFocusChanged}
              repeat={false}
            />
          <View style={styles.fullScreen}>
              <TouchableOpacity
                //style={styles.fullScreen}
                onPress={() => this.setState({ paused: !this.state.paused })}
              >
                {this.state.buffering?
                  <ActivityIndicator animating={false}/> :
                <Text style={{color: '#fff', fontSize: 30}}>{this.state.paused? 'start' : 'stop'}</Text>
              }
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      transform: [
        { rotateZ: '90deg'},
        { translateY: ((PixelRatio.getPixelSizeForLayoutSize(height)-
          PixelRatio.getPixelSizeForLayoutSize(width))/
          PixelRatio.get()) -  0},
      ],
      height: height,
      width: height,
    },
    videoStyle: {
      height: width + statusBarSize,
      alignSelf: "stretch",
    },
    topViewStyle: {
        flex: 1,
        transform: [
          { rotateZ: '90deg'},
          { translateY: ((PixelRatio.getPixelSizeForLayoutSize(height)-
            PixelRatio.getPixelSizeForLayoutSize(width))/
            PixelRatio.get()) - statusBarSize },
        ],
        height: width ,
        width: height,
      },
    fullScreen: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      alignItems: 'center',
      width: height ,
      height: width + statusBarSize,
      justifyContent: 'center',
    },
    controls: {
      backgroundColor: 'transparent',
      borderRadius: 5,
      position: 'absolute',
      bottom: 20,
      left: 20,
      right: 20,
    },
    progress: {
      flex: 1,
      flexDirection: 'row',
      borderRadius: 3,
      overflow: 'hidden',
    },
    innerProgressCompleted: {
      height: 20,
      backgroundColor: '#cccccc',
    },
    innerProgressRemaining: {
      height: 20,
      backgroundColor: '#2C2C2C',
    },
    generalControls: {
      flex: 1,
      flexDirection: 'row',
      borderRadius: 4,
      overflow: 'hidden',
      paddingBottom: 10,
    },
    rateControl: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    volumeControl: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
    },
    resizeModeControl: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    controlOption: {
      alignSelf: 'center',
      fontSize: 11,
      color: 'white',
      paddingLeft: 2,
      paddingRight: 2,
      lineHeight: 12,
    },
    activityIndicator: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: 80
   },
  });

export default Workouts
