const reducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD':
            return action.data
        default:
            return state
    }
}

export const newMessage = (message) => {
    return dispatch => {
        dispatch({
            type: 'ADD',
            data: message
        })
    }
}
export default reducer