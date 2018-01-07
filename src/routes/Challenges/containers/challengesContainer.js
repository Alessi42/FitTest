import React, {Component} from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import StarRating from '../../../components/Main/StarRating'
import TabCircles from '../../../components/Main/TabCircles'
import ChallengeItem from '../../../components/Main/challengeItem'
import CompletedChallenges from '../../../components/CompletedChallenges'

import store from '../../../store'
import {getCompletedChallenges} from '../../../reducers'

import challengesData from '../../../data/challenges.json'

const window = Dimensions.get('window');

class Challenges extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleTabPress = this.handleTabPress.bind(this);
    this.createChallengeList = this.createChallengeList.bind(this);

    // for (let i = 0; i < challengesData.difficulty.length; i++) {
    //   challengesList=[]
    //   challengesData.difficulty[i].forEach(challenge => {
    //     record = store.getRecordChallenge(completedChallenges, challenge.difficulty, challenge.id)
    //     challengesList.push(<ChallengeItem key={challenge.id} record={record
    //       ? record.displayTime
    //       : null} id={challenge.id} name={challenge.name} thumbnail={challenge.thumbnail} onPress={() => this.onPress(challenge)}/>)
    //   });
    //   challengesLists.push(challengesList)
    // }

    this.state = {
      difficulty: 0,
      // completedChallenges: completedChallenges,
      // challengesLists: challengesLists
    }
  }

  createChallengeList(challengesData) {
    console.log(challengesData);
    const completedChallenges = store.getCompletedChallenges()
    var challengesLists = []
    for (let i = 0; i < challengesData.difficulty.length; i++) {
      challengesList = []
      challengesData.difficulty[i].forEach(challenge => {
        record = store.getRecordChallengeById(completedChallenges, challenge.id)
        challengesList.push(<ChallengeItem key={challenge.id} record={record
          ? record.displayTime
          : null} id={challenge.id} name={challenge.name} thumbnail={challenge.thumbnail} onPress={() => this.onPress(challenge)}/>)
      });
      challengesLists.push(challengesList)
    }
    this.setState({
      completedChallenges: completedChallenges,
      challengesLists: challengesLists
    })
  }

  componentWillMount() {
    fetch('http://joeswebserver.uk.to/FitTest/challenges.json')
    .then((response) => {
      var contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        // do some checks here and cache it.
        return response.json();
      }
      //console.log("Oops, we haven't got JSON! Defaulting to data");
      this.createChallengeList(challengesData);
    })
    .then((json) => {
      this.createChallengeList(json)
    })
    .catch(err => console.error("error: " + err)
    );
  }

  handleTabPress(difficulty) {
    offset = window.width * difficulty
    this._scrollView.scrollTo({x: offset, animated: true});
  }

  onPress(challenge) {
    Actions.challengeScreen({'title': challenge.name, 'challenge': challenge})
  }

  handleScroll(e) {
    difficulty = Math.floor((window.width / 2 + e.nativeEvent.contentOffset.x) / window.width);
    if (difficulty != this.state.difficulty) {
      this.setState({difficulty: difficulty})
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Difficulty</Text>
        <StarRating rating={this.state.difficulty}/>
        <ScrollView onScroll={(e) => this.handleScroll(e)} ref={(c) => this._scrollView = c} horizontal pagingEnabled showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false} style={styles.scrollView} scrollEventThrottle={256} bounces={false} directionalLockEnabled={true}>
          <ScrollView style={styles.challengeContainer}>
            {this.state.challengesLists
              ? this.state.challengesLists[0]
              : null}
          </ScrollView>
          <ScrollView style={styles.challengeContainer}>
            {this.state.challengesLists
              ? this.state.challengesLists[1]
              : null}
          </ScrollView>
          <ScrollView style={styles.challengeContainer}>
            {this.state.challengesLists
              ? this.state.challengesLists[2]
              : null}
          </ScrollView>
          <ScrollView style={styles.challengeContainer}>
            {this.state.challengesLists
              ? this.state.challengesLists[3]
              : null}
          </ScrollView>
          <ScrollView style={styles.challengeContainer}>
            {this.state.challengesLists
              ? this.state.challengesLists[4]
              : null}
          </ScrollView>
        </ScrollView>
        <TabCircles handleTabPress={this.handleTabPress} tab={this.state.difficulty}/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    paddingBottom: 56,
    alignItems: 'center'
  },
  text: {
    fontSize: 22,
    color: '#fff'
  },
  challengeContainer: {
    flex: 1,
    width: window.width
  },
  scrollView: {
    flexDirection: 'row'
  }
})
export default Challenges
