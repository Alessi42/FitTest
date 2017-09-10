import {connect} from 'react-redux'
import store from '../../store'
import * as actions from './actions'
import CompletedChallenges from './CompletedChallenges'
import {getCompletedChallenges} from '../../reducers'

// Realm.Results is auto-updating, therefore no need to re-fetch the data
const completedChallengesResults = store.getCompletedChallenges()

const mapStateToProps = (state, props) => ({
  ...getCompletedChallenges(state),
  dataSource: store.completedChallengeDS.cloneWithRows(completedChallengesResults)
})

const mapDispatchToProps = {
  ...actions
}

export default connect(mapStateToProps, mapDispatchToProps)(CompletedChallenges)
