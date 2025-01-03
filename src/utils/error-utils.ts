import {ResponseType} from "../api/todolist-api";
import {Dispatch} from "redux";
import {setAppError, setAppStatus} from "../app/appSlice";

export const handleServerAppError = <T>(data:ResponseType<T>,dispatch: Dispatch) => {
    if (data.messages.length) {
        dispatch(setAppError({error:data.messages[0]}))
    } else {
        dispatch(setAppError({error:'some error'}))
    }
    dispatch(setAppStatus({status:'failed'}));
}

export const handleServerNetworkError = (error:any,dispatch: Dispatch) => {
    dispatch(setAppError(error.message ? error.message : "Some error occurred"))
    dispatch(setAppStatus({status:'failed'}));
}