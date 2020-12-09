const initialState = ''

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return ''
    default:
      return state
  }
}

let timeoutIDs = []

export const setNotification = (notification, seconds) => {
  return async dispatch => {
    clearTimeout(timeoutIDs[timeoutIDs.length - 1])
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
    })
    const timeoutID = setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
        notification})
    }, (seconds * 1000))
    timeoutIDs = timeoutIDs.concat(timeoutID)
  }
}

export default notificationReducer