import { createSelector } from 'reselect';

// Gets the category slice
const selectCategoryReducer = state => state.categories;

// The first argument is an array of input selectors
// The second argument is the output selector
// The arguments of the output selector depend on how many input selectors we have
// Each argument is the value returned from an input selector
export const selectCategories = createSelector(
    [selectCategoryReducer],
    categoriesSlice => categoriesSlice.categories
);

// Compose chain of memoized selectors
export const selectCategoriesMap = createSelector(
    [selectCategories],
    categories =>
        categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
);

export const selectIsLoading = createSelector(
    [selectCategoryReducer],
    categoriesSlice => categoriesSlice.isLoading
);
