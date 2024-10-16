import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../app/app-reducer";
import {ResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";

export const handleServerAppError = <T>(data:ResponseType<T>,dispatch: Dispatch<SetAppErrorActionType|SetAppStatusActionType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('some error'))
    }
    dispatch(setAppStatusAC('failed'));
}

export const handleServerNetworkError = (error:any,dispatch: Dispatch<SetAppErrorActionType|SetAppStatusActionType>) => {
    dispatch(setAppErrorAC(error.message ? error.message : "Some error occurred"))
    dispatch(setAppStatusAC('failed'));
}