import Realm from 'realm'
import {ListView} from 'realm/react-native'
const uuid = require('uuid')

//import TodoItem from '../models/'
class TodoItem {
  static get() {
    return realm.objects(TodoItem.schema.name)
  }
  static schema = {
    name: 'TodoItem',
    primaryKey: 'id',
    properties: {
      id: {
        type: 'string'
      },
      value: {
        type: 'string'
      },
      completed: {
        type: 'bool',
        default: false
      },
      createdTimestamp: {
        type: 'date'
      }
    }
  }
}

export const todoItemDS = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id
})

export const getTodoItems = () => {
  const todoItems = TodoItem.get().sorted('createdTimestamp', true)
  return todoItems
}

export const getTodoItem = (id) => {
  const todoItem = realm.objectForPrimaryKey(TodoItem, id)
  return todoItem
}

export const updateTodoItem = (todoItem, value, completed) => {
  realm.write(() => {
    try {
      todoItem.value = value
      todoItem.completed = completed
    } catch (e) {
      console.warn(e)
    }
  })
}

export const createTodoItem = (value) => {
  realm.write(() => {
    realm.create(TodoItem.schema.name, {
      id: uuid.v1(),
      value,
      createdTimestamp: new Date()
    })
  })
}

export const deleteTodoItem = (todoItem) => {
  realm.write(() => {
    realm.delete(todoItem)
  })
}

class CompletedChallenge {
  static get() {
    return realm.objects(CompletedChallenge.schema.name)
  }
  static schema = {
    name: 'CompletedChallenge',
    primaryKey: 'id',
    properties: {
      id: {
        type: 'string'
      },
      time: {
        type: 'double'
      },
      displayTime: {
        type: 'string'
      },
      difficulty: {
        type: 'int'
      },
      level: {
        type: 'int'
      },
      record: {
        type: 'bool',
        default: false
      },
      completedTimestamp: {
        type: 'date'
      }
    }
  }
}

export const completedChallengeDS = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1.id !== r2.id
})

export const getCompletedChallenges = () => {
  const completedChallenges = CompletedChallenge.get().sorted('completedTimestamp', true)
  return completedChallenges
}

export const getCompletedChallenge = (id) => {
  const completedChallenge = realm.objectForPrimaryKey(CompletedChallenge, id)
  return completedChallenge
}

export const getChallengeAttempts = (difficulty, level) => {
  const challengeAttemps = CompletedChallenge.get().filtered('difficulty = ' + difficulty + ' AND level =' + level).sorted('completedTimestamp', true)
  return challengeAttemps
}

export const getRecordChallenge = (completedChallenges, difficulty, level) => {
  const challengeAttemps = completedChallenges
    ? completedChallenges.filtered('difficulty = ' + difficulty + ' AND level =' + level).sorted('completedTimestamp', true)
    : getCompletedChallenges(difficulty, level)
  return challengeAttemps.sorted('time', false)[0]
}

export const getRecordChallengeById = (completedChallenges, id) => {
  const challengeAttemps = completedChallenges
    ? completedChallenges.filtered('id = "' + id + '"').sorted('completedTimestamp', true)
    : getCompletedChallenges(difficulty, id)
  return challengeAttemps.sorted('time', false)[0]
}

export const updateCompletedChallenge = (completedChallenge, time) => {
  realm.write(() => {
    try {
      completedChallenge.time = time
    } catch (e) {
      console.warn(e)
    }
  })
}

function formatTime(time) {
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

export const createCompletedChallenge = (difficulty, id, time) => {
  const currentRecord = getRecordChallengeById(id)
  realm.write(() => {
    realm.create(CompletedChallenge.schema.name, {
      id: id,
      difficulty,
      level,
      time,
      record: currentRecord
        ? currentRecord.time > time
        : true,
      displayTime: formatTime(time),
      completedTimestamp: new Date()
    })
  })
}

export const deleteCompletedChallenge = (CompletedChallenge) => {
  realm.write(() => {
    realm.delete(CompletedChallenge)
  })
}

export const deleteAllCompletedChallenge = () => {
  realm.write(() => {
    let allCompletedChallenges = realm.objects('CompletedChallenge');
    realm.delete(allCompletedChallenges); // Deletes all completed challenges
  })
}

const realm = new Realm({
  schema: [TodoItem, CompletedChallenge]
})
