// currying a function is essentially a function that returns another function.
// Will show the next state because we are calling next(action) actions will be passed on, subsequent
// middleware will run and all reducers will run and after that we console.log the next state
export const loggerMiddleware = store => next => action => {
    if (!action.type) {
        return next(action);
    }

    console.log('type: ', action.type);
    console.log('payload: ', action.payload);
    console.log('currentState: ', store.getState());

    next(action);

    console.log('next state: ', store.getState());
};
