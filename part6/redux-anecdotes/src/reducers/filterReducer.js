const filterReducer = (state = '', action) => {
    switch (action.type) {
        case 'SEARCH':
            return action.filter;
        default:
            return state;
    };
};

export const filterChange = (filter) => {
    return {
        type: 'SEARCH',
        filter,
    };
};

export default filterReducer;