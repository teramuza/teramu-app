import { combineReducers } from 'redux';

// import todos from './todospath'
import songs from './songs'
import auth from './auth'

const appReducer = combineReducers({
	//todos
	songs,
	auth
});

export default appReducer;