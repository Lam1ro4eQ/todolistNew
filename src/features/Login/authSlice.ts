import {
    setAppIsInitialized,
    setAppStatus

} from "../../app/appSlice";
import {Dispatch} from "redux";
import {authAPI} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {LoginDataType} from "./Login";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";


export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false

    },
    reducers: (creators) => {
        return {
            setIsLoggedIn: creators.reducer<{ isLoggedIn: boolean }>((state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn
            })
        }
}
    // reducers: {
    //     setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
    //         state.isLoggedIn = action.payload.isLoggedIn
    //     }
    // }
})

export const authReducer = authSlice.reducer
export const {setIsLoggedIn} = authSlice.actions


export const meTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status:'loading'}))

    try {
        const res = await authAPI.me()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({isLoggedIn: true}))
            dispatch(setAppStatus({status:'idle'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    } finally {
        dispatch(setAppIsInitialized({isInitialized:true}))
    }

}

export const loginTC = (loginData: LoginDataType) => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status:'loading'}))
    try {
        const res = await authAPI.login(loginData)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({isLoggedIn: true}))
            dispatch(setAppStatus({status:'idle'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    }
}

export const logOutTC = () => async (dispatch: Dispatch) => {
    dispatch(setAppStatus({status:'loading'}))

    try {
        const res = await authAPI.logout()
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedIn({isLoggedIn: false}))
            dispatch(setAppStatus({status:'idle'}))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    }
}