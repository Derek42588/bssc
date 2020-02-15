const providersReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_PROVIDERS':
            return action.data
        default:
            return state
    }
}

export const initializeProviders = (providers) => {
    return async dispatch => {
        dispatch({
            type: 'INIT_PROVIDERS',
            data: providers,
        })
    }
}

export default providersReducer