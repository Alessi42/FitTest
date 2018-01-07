import React, {Component} from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import ChallengeItem from '../../../components/Main/challengeItem'

import {increment, doubleAsync} from '../modules/workoutReducer'

class Workouts extends Component {
  constructor(props) {
    super(props);
    this.createWorkoutList = this.createWorkoutList.bind(this);
    this.state = {
        category: 0,
    }
  }
  componentWillMount() {
    fetch('http://joeswebserver.uk.to/FitTest/workouts.json')
    .then((response) => {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        // do some checks here and cache it.
        return response.json();
      }
      //console.log("Oops, we haven't got JSON! Defaulting to data");
      this.createWorkoutList(workoutData);
    })
    .then((json) => {
      this.createWorkoutList(json)
    })
    .catch(err => console.error("error: " + err)
    );
  }

  createWorkoutList(workoutData) {
    console.log(workoutData);
    //const completedChallenges = store.getCompletedChallenges()
    var workoutList = []
    workoutList = []
    workoutData.category[this.state.category].forEach(workout => {
      workoutList.push(<ChallengeItem key={workout.id} record={null} id={workout.id} name={workout.name} thumbnail={workout.thumbnail} onPress={() => this.onPress(workout)}/>)
    });
    this.setState({
      workoutList: workoutList
    })
  }

  onPress(workout) {
    Actions.workoutScreen({'title': workout.name, 'workout': workout})
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        {this.state.workoutList}
      </ScrollView>
    )
  }
}
const styles = {
  container: {
    paddingTop: 64,
  }
}
export default Workouts
