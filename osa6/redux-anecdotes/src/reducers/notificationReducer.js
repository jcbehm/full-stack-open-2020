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

export const notificationVote = notification => {
  notification = `you voted '` + notification + `'`
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const notificationCreate = notification => {
  notification = `you added '` + notification + `'`
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}

export const notificationRemoval = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  }
}

export default notificationReducer