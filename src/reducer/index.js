import {combineReducers} from 'redux';

import listOfTasklistContainer from './TaskListOps.js';
import listToTaskContainer from './TaskOps.js';
import Authentication from './Authentication.js';

const reducer = combineReducers({
  listOfTasklistContainer,
  listToTaskContainer,
  Authentication,
});

export default reducer;
