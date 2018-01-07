import React, {Component} from 'react'
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import AnimatedCircularTimer from '../../../components/Main/animatedCircularTimer'
import CircularTimer from '../../../components/Main/circularTimer'
import TimerMixin from 'react-timer-mixin';
import store from '../../../store'
import * as actions from '../../../components/CompletedChallenges/actions'

class ChallengeScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      period: 60000,
      timeElapsed: null,
      running: null,
      startTime: null,
      laps: [],
      fill: 0,
      countDown: false,
      countDuration: 6000
    }
    this.handleStartPress = this.handleStartPress.bind(this);
    this.onBack = this.onBack.bind(this);
  }
  componentWillMount() {
    Actions.refresh({onBack: this.onBack})
  }
  handleStartPress() {
    if (this.state.running) {
      clearInterval(TimerMixin.interval);
      if (!this.state.countDown) {
        this.storeTime(this.state.timeElapsed)
      }
      this.setState({running: false});
      return;
    }

    this.setState({startTime: new Date(), laps: [], fill: 100, running: true, countDown: true});

    TimerMixin.interval = setInterval(() => {
      var elapsed = new Date() - this.state.startTime
      if (this.state.countDown) {
        if (elapsed > this.state.countDuration - 1000) {
          this.setState({countDown: false, startTime: new Date(), fill: 0.1})
        }
        // countdown
        this.setState({
          timeElapsed: elapsed,
          displayTime: this.formatTime(this.state.countDuration - elapsed),
          fill: 100 - (100 * elapsed / (this.state.countDuration - 1000))
        });
      } else {
        this.setState({
          timeElapsed: elapsed,
          displayTime: this.formatTime(elapsed),
          fill: (100 * (this.state.timeElapsed % this.state.period)) / this.state.period
        });
      }
    }, 100);
  }

  storeTime(time) {
    try {
      actions.createCompletedChallenge(this.props.challenge.difficulty, this.props.challenge.id, time)
      console.log('added challenge time')
    } catch (error) {
      console.log(error)
      // Error saving data
    }
  }
  formatTime(time) {
    var sec_num = parseInt(time / 1000); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return hours > 0
      ? hours + ':' + minutes + ':' + seconds
      : minutes + ':' + seconds;
  }

  onBack() {
    if (this.state.running) {
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
    } else{
      Actions.pop()
    }
  }
  // running={this.state.running} timeElapsed={this.state.displayTime} fill={this.state.fill}
  componentWillUnmount() {
    clearInterval(TimerMixin.interval);
  }
  render() {
    const exercises = () => {
      return this.props.challenge.sets.map((set, index) => {
        var sets =  set.exercises.map((exercise, index) => {
          return <Text style={styles.exerciseText} key={index}> {exercise.amount} {exercise.name}</Text>
        });
        return set.repeat > 1 ? <View style={styles.setView} key={index}>
          <Text style={styles.setText}> x{set.repeat}</Text>
          {sets}
        </View> : sets;
      });
    }
    return (
      <View style={styles.container}>
        {/**
        <View style={styles.navigationBarStyle}>
          <TouchableOpacity>
            <Image style={styles.backButton} source={this.props.leftButtonIcon}/>
          </TouchableOpacity>
          <Text>{this.props.title}</Text>
        </View>
        **/}
        <View style={styles.topContainer}>
          <Image style={styles.graph} source={require('../../../components/Icons/Video.png')}/>
          <ScrollView>
            {exercises()}
          </ScrollView>
          <Image style={styles.graph} source={require('../../../components/Icons/Graph.png')}/>
        </View>
        <View style={styles.timer}>
          <AnimatedCircularTimer running={this.state.running} timeElapsed={this.state.displayTime} fill={this.state.fill} size={250} width={5}/>
          <Text style={styles.timeText}>{this.state.running
              ? this.state.displayTime
              : "00:00"}</Text>
        </View>
        <TouchableOpacity onPress={this.handleStartPress}>
          <Image style={styles.controls} source={!this.state.running? require('../../../components/Icons/Stop.png') : require('../../../components/Icons/Start.png')}/>
        </TouchableOpacity>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 64,
    paddingBottom: 56,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  navigationBarStyle: {
    height: 56,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backButton: {
    height: 24,
    width: 24,
    tintColor: '#ecdca9'
  },
  timer: {
    height: 250,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 22,
    color: '#fff'
  },
  timeText: {
    position: 'absolute',
    color: '#ecdca9',
    fontSize: 42
  },
  topContainer: {
    flexDirection: 'row',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 24,
    paddingRight: 24
  },
  setView: {
    borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: 'rgb(255, 0, 0)',
  },
  setText: {
    fontSize: 16,
    color: '#fff',
  },
  exerciseText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center'
  },
  graph: {
    height: 40,
    width: 40,
    tintColor: '#fff'
  },
  controls: {
    height: 56,
    width: 56,
    tintColor: '#fff'
  }
})
export default ChallengeScreen
