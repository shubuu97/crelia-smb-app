const industryReducer = (state = {
    type: '',
    error: '',
    isFetching: false,
    //didInvalidate: false,
    lookUpData: []
}, action) => {
    switch (action.type) {
        case 'industry_init':
            return Object.assign({}, state, {
                isFetching: true,
                type: action.type,
                lastUpdated: action.receivedAt,
            });
        case 'industry_success':
            return Object.assign({}, state, {
                error: '',
                isFetching: false,
                type: action.type,
                //didInvalidate: false,
                lookUpData: action.data,
                lastUpdated: action.receivedAt,
            });
        case 'industry_error':
            return Object.assign({}, state, {
                isFetching: false,
                type: action.type,
                error: action.error,
                lookUpData: [],
                lastUpdated: action.receivedAt
            });

    }
    return state;
}

export default industryReducer;