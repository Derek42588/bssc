const usersReducer = (state = [], action) => {
    switch(action.type) {
        case 'INIT_USER':
            return action.data
        case 'LOGIN_USER':
            return action.data
        case 'LOGOUT_USER':
            return action.data
        default:
            return state
    }
}

export const initializeUser = (user) => {
    return async dispatch => {
        dispatch({
            type: 'INIT_USER',
            data: user,
        })
    }
}

export const loginUser = (user) => {
    return async dispatch => {
        dispatch({
            type: 'LOGIN_USER',
            data: user
        })
    }
}

export const logoutUser = () => {
    return async dispatch => {
        dispatch({
            type: 'LOGOUT_USER',
            data: null
        })
    }
}

export default usersReducer