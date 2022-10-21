import { combineReducers } from 'redux';
import userData from './user.reducers'
import postData from './post.reducers'

export default combineReducers({ 
userData,
postData,


});