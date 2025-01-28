import {createSlice} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ThemeMode = 'dark' | 'light'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isInitialized: false,
        status: 'idle' as RequestStatusType,
        error: null as string | null,
        themeMode: 'light' as ThemeMode
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
            }),
            changeTheme: create.reducer<{themeMode: ThemeMode}>((state,action)=> {
                state.themeMode = action.payload.themeMode
            })
        }
    },
    selectors: {
        selectAppThemeMode:(state) => state.themeMode,
        selectAppStatus:(state) => state.status,
        selectAppError:(state) => state.error,
        selectAppIsInitialized:(state) => state.isInitialized
    }
})


export const {setAppStatus,setAppError,setAppIsInitialized,changeTheme} = appSlice.actions
export const appReducer = appSlice.reducer
export const {selectAppStatus,selectAppError,selectAppThemeMode,selectAppIsInitialized} = appSlice.selectors
export type AppStateType = ReturnType<typeof appSlice.getInitialState>