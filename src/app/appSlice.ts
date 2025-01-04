import {createSlice} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isInitialized: false,
        status: 'idle' as RequestStatusType,
        error: null as string | null
    },
    reducers: create => {
        return {
            setAppStatus: create.reducer<{ status: RequestStatusType }>((state, action) => {
                state.status = action.payload.status
            }),
            setAppError: create.reducer <{ error: string | null }>((state, action) => {
                state.error = action.payload.error
            }),
            setAppIsInitialized: create.reducer<{ isInitialized: boolean }>((state, action) => {
                state.isInitialized = action.payload.isInitialized
            })
        }
    }
})


export const {setAppStatus,setAppError,setAppIsInitialized} = appSlice.actions
export const appReducer = appSlice.reducer
export type AppStateType = ReturnType<typeof appSlice.getInitialState>