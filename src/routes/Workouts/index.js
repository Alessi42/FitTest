import WorkoutContainer from './containers/workoutContainer'
import reducer from './modules/workoutReducer'

export default {
  path: 'workouts',
  title: 'Workouts',
  component: WorkoutContainer,
  reducer: reducer
}
