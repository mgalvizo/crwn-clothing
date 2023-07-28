// Encapsulates all sagas
import { all, call } from 'redux-saga/effects';

// Saga configuration
import { categoriesSaga } from './categories/category.saga';
import { userSaga } from './user/user.saga';

// ES6 generator function
export function* rootSaga() {
    yield all([call(categoriesSaga), call(userSaga)]);
}
