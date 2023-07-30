// side effect generators
import { takeLatest, all, call, put } from 'typed-redux-saga/macro';
import { getCategoriesAndDocuments } from '../../utils/firebase.utils';
import {
    fetchCategoriesSuccess,
    fetchCategoriesFailed,
} from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';

export function* fetchCategoriesAsync() {
    try {
        // Anywhere you have a function and you want to turn it into an effect you use call()
        const categoriesArray = yield* call(getCategoriesAndDocuments);
        // We yield put in place of when we could have dispatched an action
        yield* put(fetchCategoriesSuccess(categoriesArray));
    } catch (err) {
        yield* put(fetchCategoriesFailed(err as Error));
    }
}

export function* onFetchCategories() {
    // Returns the latest action, previous ones will be canceled
    yield* takeLatest(
        CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
        fetchCategoriesAsync
    );
}

// accumulator that holds all category sagas
export function* categoriesSaga() {
    // Stops the execution of everything else until the generator finishes to execute all passedgenerators
    yield* all([call(onFetchCategories)]);
}
