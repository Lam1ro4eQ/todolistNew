import {setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";
import {Dispatch} from "redux";
import {authAPI} from "../../api/todolist-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {LoginDataType} from "./Login";

type InitialStateType = typeof initialState

const initialState = {
    isLoggedIn: false,
}

export const authReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'SET_IS_LOGGED_IN':
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}
// Action creators
const setIsLoggedInAC = (value: boolean) => {
    return {type: 'SET_IS_LOGGED_IN', value} as const
}

// Actions types
type ActionsType = ReturnType<typeof setIsLoggedInAC>

// thunks
export const loginTC = (loginData: LoginDataType) => async (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'))

    try {
        const res = await authAPI.login(loginData)
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true))
            dispatch(setAppStatusAC('idle'))
        } else {
            handleServerAppError(res.data, dispatch)
        }
    } catch (e) {
        handleServerNetworkError(e as { message: string }, dispatch)
    }

}