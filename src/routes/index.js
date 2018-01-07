import Home from './Home'
import Progress from './Progress'
import User from './User'
import Counter from './Counter'
import Workouts from './Workouts'
import WorkoutScreen from './WorkoutScreen'
import Challenges from './Challenges'
import ChallengeScreen from './ChallengeScreen'

export default {
	indexRoute: Home,
	challengesRoute: Challenges,
	challengeScreenRoute: ChallengeScreen,
	workoutScreenRoute: WorkoutScreen,
	progressRoute: Progress,
	userRoute: User,
	childRoutes: [Workouts]
}
