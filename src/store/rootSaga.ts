// Encapsulates all sagas
import { all, call } from 'typed-redux-saga/macro';

// Saga configuration
import { categoriesSaga } from './categories/category.saga';
import { userSagas } from './user/user.saga';

// ES6 generator function
export function* rootSaga() {
    yield* all([call(categoriesSaga), call(userSagas)]);
}
