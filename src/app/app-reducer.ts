export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState: InitialStateType = {
    isInitialized: false,
    status: 'idle',
    error: null,
}

export type InitialStateType = {
    // происходит ли сейчас взаимодействие с сервером
    status: RequestStatusType
    // если ошибка какая-то глобальная произойдёт - мы запишем текст ошибки сюда
    error: string | null
    isInitialized: boolean
}

export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-IS_INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) =>
    ({type: 'APP/SET-STATUS', status}) as const
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error}) as const
export const setAppIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-IS_INITIALIZED', isInitialized}) as const

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setAppIsInitializedType = ReturnType<typeof setAppIsInitializedAC>

type ActionsType = SetAppStatusActionType | SetAppErrorActionType | setAppIsInitializedType