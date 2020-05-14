const initialState = ''


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MESSAGE':
            return [...state, action.message]
        case 'CLEAR':
            return initialState
        default:
            return state;
    }
}

export const voteNotification = (content, time) => {
    return async dispatch => {
        dispatch({
            type: 'MESSAGE',
            message: `You have voted for: ${content}`
        })
        setTimeout(() => dispatch(clearNotification()), time * 1000)
    }
}
export const newNotification = (content) => {
    return {
        type: 'MESSAGE',
        message: `You have created ${content}`
    }
}
export const clearNotification = () => {
    return {
        type: 'CLEAR',
        message: null
    }
}

export default reducer