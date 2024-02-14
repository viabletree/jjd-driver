import {fork} from 'redux-saga/effects';
import user from './user';
import init from './init';
import general from './general';
import jobs from './jobs';
import availability from './availability';
import tracking from './tracking';

export default function* root() {
  yield fork(user);
  yield fork(init);
  yield fork(general);
  yield fork(jobs);
  yield fork(availability);
  yield fork(tracking);
}
