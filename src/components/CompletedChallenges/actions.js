import store from '../../store'

export const createCompletedChallenge = (difficulty, id, time) => {
  store.createCompletedChallenge(difficulty, id, time)
  return {
    type: 'COMPLETED_CHALLENGE_ADDED'
  }
}

export const deleteCompletedChallenge = (completedChallenge) => {
  store.deleteCompletedChallenge(completedChallenge)
  return {
    type: 'COMPLETED_CHALLENGE_DELETED'
  }
}
