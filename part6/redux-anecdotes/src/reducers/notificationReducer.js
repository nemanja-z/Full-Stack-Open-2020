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

export const voteNotification = (content) => {
    return {
        type: 'MESSAGE',
        message: `You have voted for: ${content}`
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