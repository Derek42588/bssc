import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


import providersReducer from './reducers/providersReducer'
import usersReducer from './reducers/usersReducer'
import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
    providers: providersReducer,
    user: usersReducer,
    notification: notificationReducer
})

const store = createStore(reducer, composeWithDevTools(
    applyMiddleware(thunk)
    )
)
export default store