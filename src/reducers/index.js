import {combineReducers} from 'redux'
import TodoItems from './todoItems'
import CompletedChallenges from './completedChallenges'

export default combineReducers({
  TodoItems, CompletedChallenges
})

export const getTodoItems = ({todoItems}) => todoItems

export const getCompletedChallenges = ({completedChallenges}) => completedChallenges
