const initialState = '';
var timeoutID;

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'MESSAGE':
            return action.message;
        case 'CLEAR':
            return initialState;
        default:
            return state;
    }
}

export const voteNotification = (content, time) => {
    return dispatch => {
        dispatch({
            type: 'MESSAGE',
            message: `You have voted for: ${content}`
        });
        clearTimeout(timeoutID);
        timeoutID = setTimeout(() => dispatch(clearNotification()), time * 1000);
    };
};
export const newNotification = (content, time) => {
    return dispatch => {
        dispatch({
            type: 'MESSAGE',
            message: `You have created ${content}`
        });
        setTimeout(() => dispatch(clearNotification()), time * 1000);
    };
};
export const clearNotification = () => {
    return {
        type: 'CLEAR',
        message: null
    };
};

export default reducer;