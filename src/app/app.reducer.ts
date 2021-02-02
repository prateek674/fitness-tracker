export interface State {
    isLoading: boolean;
}

const initialState: State = {
    isLoading: true
};

export function appReducer(state = initialState, action) {
    // action must always be an object with 'type' property
    switch(action.type) {
        case 'START_LOADING':
            return {
                isLoading: true
            };
        default:
            return state;
    }
}