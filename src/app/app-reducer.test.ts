import {appReducer, AppStateType, RequestStatusType, setAppError} from "./appSlice";

let startState: AppStateType;

beforeEach(() => {
    startState = {
        error: null,
        status: 'idle' as RequestStatusType,
        isInitialized: false
    }
})

test('correct error should be set', () => {
    const endState = appReducer(startState, setAppError({error:'some error'}))

    expect(endState.error).toBe('some error');
});