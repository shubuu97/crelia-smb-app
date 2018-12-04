const staticReducers = (state = { data: {}, }, action) => {
    switch (action.type) {
        case 'SAVE_FUND_REQ_ID':
            return Object.assign({}, state, {
                type: action.type,
                fund: action.data
            });
    }
    return state;
}



export default staticReducers;