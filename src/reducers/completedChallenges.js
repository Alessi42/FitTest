const DEFAULT_STATE = {}

export default (state = DEFAULT_STATE, {type, payload} = {}) => {
  switch (type) {
    case 'COMPLETED_CHALLENGE_ADDED':
    case 'COMPLETED_CHALLENGE_DELETED':
      return {...state, lastModified: Date.now()}
    default:
      return state
  }
}
