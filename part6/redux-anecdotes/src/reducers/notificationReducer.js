const initialState = ['This is an example'
]

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'NEW':
            return state.concat(action.data)
        default:
            return state;
    }
}

export const message = () => {
    return {
        data: message
    }
}

export default reducer