const initialState = ''


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MESSAGE':
            return action.message
        default:
            return state;
    }
}

export const voteNotification = (content) => {
    return {
        type: 'MESSAGE',
        message: `You have voted for ${content}`
    }
}
export const newNotification = (anecdote) => {
    return {
        type: 'MESSAGE',
        message: `You have created ${anecdote}`
    }
}
export const clearNotification = () => {
    return {
        type: 'MESSAGE',
        message: null
    }
}

export default reducer