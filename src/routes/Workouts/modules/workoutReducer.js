const INCREMENT = 'INCREMENT'

export const doubleAsync = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      console.log(getState().counter,increment(getState().counter))
      dispatch(increment(7))
      resolve()
    })
  }
}

export const increment = (value = 1) => ({
  type: INCREMENT,
  value
})

const initialState = 0

export default function counter(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.value
    default:
      return state
  }
}
