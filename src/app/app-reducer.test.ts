import {appReducer, InitialStateType, setAppErrorAC} from "./app-reducer";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test('correct error should be set', () => {
    const endState = appReducer(startState, setAppErrorAC('some error'))

    expect(endState.error).toBe('some error');
});