import {appSlice, InitialStateType, setAppErrorAC} from "./appSlice";

let startState: InitialStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle',
        isInitialized: false
    }
})

test('correct error should be set', () => {
    const endState = appSlice(startState, setAppErrorAC('some error'))

    expect(endState.error).toBe('some error');
});