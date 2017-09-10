import Home from './Home'
import Progress from './Progress'
import User from './User'
import Counter from './Counter'
import Workouts from './Workouts'
import Challenges from './Challenges'
import ChallengeScreen from './ChallengeScreen'

export default {
	indexRoute: Home,
	challengesRoute: Challenges,
	challengeScreenRoute: ChallengeScreen,
	progressRoute: Progress,
	userRoute: User,
	childRoutes: [Workouts]
}
