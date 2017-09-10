import CounterContainer from './containers/countContainer'
import reducer from './modules/countReducer'

export default {
  path: 'counter',
  title: 'Counter',
  component: CounterContainer,
  reducer: reducer
}
