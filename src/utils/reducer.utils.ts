import { AnyAction } from 'redux';

// Implement type predicate which is like a function that verifies whether a specific argument that it receives is
// going to be a narrower (more specific) type or not, AC stands for Action Creator
type Matchable<AC extends () => AnyAction> = AC & {
    // Type Intersection with "&"
    // ReturnType constructs a type consisting of the return type of function Type
    type: ReturnType<AC>['type'];
    match(action: AnyAction): action is ReturnType<AC>;
};

// Overloading matchable object, will attach a match method that checks if the action type is equal to the type itself
export function withMatcher<AC extends () => AnyAction & { type: string }>(
    actionCreator: AC
): Matchable<AC>;

// With arguments
export function withMatcher<
    AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>;

// Represents a function that can take any number of arguments, and return any type
export function withMatcher(actionCreator: (...args: any[]) => any) {
    const type = actionCreator().type;
    return Object.assign(actionCreator, {
        type,
        match(action: AnyAction) {
            return action.type === type;
        },
    });
}

// We CANNOT set payload as optional since it would be a possibility to expect a value of undefined
// It is better to define 2 Action types one with payload and one without it.
export type ActionWithPayload<T, P> = {
    type: T;
    payload: P;
};

export type Action<T> = {
    type: T;
};

// Returns different types depending on the parameters that we receive (OVERLOADING)
// Convert to normal function declaration
export function createAction<T extends string, P>(
    type: T,
    payload: P
): ActionWithPayload<T, P>;

// To make it compatible we have to add payload with void type
export function createAction<T extends string>(
    type: T,
    payload: void
): Action<T>;

export function createAction<T extends string, P>(type: T, payload: P) {
    return { type, payload };
}
