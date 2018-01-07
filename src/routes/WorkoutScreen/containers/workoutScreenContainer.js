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
  ActivityIndicator,
  Alert
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import {increment, doubleAsync} from '../modules/workoutScreenReducer'
//import Video from 'react-native-video';
var Orientation = require('react-native-orientation');
var {height, width} = Dimensions.get('window');
import TimerMixin from 'react-native-background-timer';
import Picker from 'react-native-wheel-picker'
var PickerItem = Picker.Item;

import VideoPlayer from 'react-native-video-controls';

const statusBarSize = 25;

class WorkoutScreen extends Component {
    constructor(props) {
        super(props);
        console.log(props.workout.challenges)
        this.state = {
            selectedItem : 0,
            itemList: ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99"],
            showPicker: false,
            challenges: props.workout.challenges,
            currentChallenge: props.workout.challenges[0],
            timers: [],
            currentTime: 0,
            paused: false,
            completedChallenges: []
        };
    }

    componentWillMount() {
      Orientation.lockToLandscape();
      StatusBar.setHidden(true);
      console.log("will")
      this.setState({ paused: false, buffering: true });
    }

    componentWillUnmount() {
      StatusBar.setHidden(false)
      Orientation.lockToPortrait();
    }

    onProgress = (data) => {
      this.setState({ currentTime: data.currentTime });
    };

    timestampReached = (challenge) => {
      if (this.state.paused) {
        TimerMixin.clearAll()
      } else {
        this.setState({currentChallenge: challenge, showPicker: true});
      }
    };

    onLoad = (data) => {
      timers = []
      for (let i = 0; i < this.state.challenges.length; i++) {
        remaining_time = this.state.challenges[i].timestamp - this.state.currentTime;
        if (remaining_time > 0) {
          timers[i] = TimerMixin.setTimeout(this.timestampReached.bind(null,this.state.challenges[i]), remaining_time * 1000)
        }
      }
      this.setState({timers: timers});
    };

    onChange = (data) => {
      console.log("onchange",data);
      TimerMixin.clearAll()
      if (!data) {
      var timers = [];
      for (let i = 0; i < this.state.challenges.length; i++) {
        remaining_time = this.state.challenges[i].timestamp - this.state.currentTime;
        if (remaining_time > 0) {
          console.log(remaining_time)
          timers[i] = TimerMixin.setTimeout(this.timestampReached.bind(null,this.state.challenges[i]), remaining_time * 1000)
        }
      }
      this.setState({timers: timers,paused: data});
    }
    }

    onBack() {
      //Actions.pop();
      Orientation.lockToPortrait();
        Alert.alert('Giving up is not an option!', 'Are you sure you want to quit?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }, {
            text: 'Yes',
            onPress: () => {
              console.log('quited')
              Actions.pop()
            }
          }
        ], {cancelable: false})

    }

    onPickerSelect (index) {
        this.setState({
            selectedItem: index,
        })
    }

    onPress = () => {
        this.setState({
            showPicker: false,
        });
        currentChallenge = this.state.currentChallenge
        challenges = this.state.challenges
        completedChallenges = this.state.completedChallenges
        index = challenges.indexOf(currentChallenge)
        completedChallenges[index] = {name: currentChallenge.name, amound: this.state.selectedItem}
        this.setState({completedChallenges: completedChallenges-1, selectedItem:0})
        console.log(completedChallenges);
    }

    render() {
      return (
        <View
        style={{flex: 1, backgroundColor: "red"}}>
          <StatusBar hidden={true} />
          <VideoPlayer
            source={{ uri: 'http://joeswebserver.uk.to/wo1.mp4' }}
            style={styles.videoStyle}
            disableFullscreen={ true }
            disableVolume={ true }
            onBack={this.onBack}
            onProgress={this.onProgress}
            onLoad={this.onLoad}
            onChange={this.onChange}
            //onPause={this.onPause}
            //onPlay={this.onPlay}
          />
          {this.state.showPicker ?
            <View pointerEvents="box-none" style={styles.overlay}>
              <Text>{this.state.currentChallenge.name}</Text>
            <Picker style={{width: 150, height: 180}}
                selectedValue={this.state.selectedItem}
                itemStyle={{color:"white", fontSize:26}}
                onValueChange={(index) => this.onPickerSelect(index)}>
                    {this.state.itemList.map((value, i) => (
                        <PickerItem label={value} value={i} key={"rep"+value}/>
                    ))}
            </Picker>
            <TouchableOpacity
         style={styles.button}
         onPress={this.onPress}
       >
         <Text style={styles.buttonText}> OK </Text>
       </TouchableOpacity>
          </View> : null}
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
            PixelRatio.get()) },
        ],
        height: width ,
        width: height,
      },
    fullScreen: {
      position: 'absolute',
      top: height/2,
      left: width/2,
      bottom: 0,
      right: 0,
      alignItems: 'center',
      width: height ,
      height: width + statusBarSize,
      justifyContent: 'center',
    },
    button: {
      alignItems: 'center',
      padding: 10
    },
    buttonText: {
      color: "#fff",
      fontSize: 18,
    },
    overlay: {
      backgroundColor: 'rgba(0,0,0,.6)',
      position: "absolute",
      width: width,
      height: height,
      justifyContent: 'center',
      alignItems: 'center'
    },
  });

export default WorkoutScreen
