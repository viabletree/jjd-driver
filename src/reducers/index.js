import {combineReducers} from 'redux';

import navigator from './navigator';
import user from './user';
import general from './general';
import jobs from './jobs';
import availability from './availability';
import tracking from './tracking';

export default combineReducers({
  route: navigator,
  user,
  general,
  jobs,
  availability,
  tracking,
});
