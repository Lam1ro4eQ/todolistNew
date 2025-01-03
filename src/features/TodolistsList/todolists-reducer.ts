import {todoListAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";
import {RequestStatusType, setAppStatus} from "../../app/appSlice";


const initialState: Array<TodolistDomainType> = []


export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id != action.id)
        case 'ADD-TODOLIST':
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-TODOLIST-FILTER':
            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case "CHANGE-TODOLIST-ENTITY-STATUS":
            return state.map(tl => tl.id === action.id ? {...tl, entityStatus: action.entityStatus} : tl)
        case "SET-TODOLISTS":
            return action.todolists.map(tl => {
                return {...tl, filter: 'all', entityStatus: 'idle'}
            })
        default:
            return state;
    }
}
//actions
export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', todolist} as const
}
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', id, title} as const
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', id, filter} as const
}
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => {
    return {type: 'CHANGE-TODOLIST-ENTITY-STATUS', id, entityStatus} as const
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
export const clearTodolost = () => {
    return []
}

//thunks
export const fetschTodolistsTC = () => {
    return (dispatch:any) => {
        dispatch(setAppStatus({status: 'loading'}))
        todoListAPI.getTodoList()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatus({status:'succeeded'}))
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatus({status:'loading'}))
        dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
        todoListAPI.deleteTodoList(todolistId)
            .then((res) => {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatus({status:'succeeded'}))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatus({status:'loading'}));
        todoListAPI.createTodoList(title)
            .then((res) => {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatus({status:'succeeded'}));
            })
    }
}

export const changeTodolistTitleTC = (todoID: string, title: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatus({status:'loading'}));
        todoListAPI.updateTodoList(todoID, title)
            .then((res) => {
                dispatch(changeTodolistTitleAC(todoID, title))
                dispatch(setAppStatus({status:'succeeded'}));
            })
    }
}
//types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | SetTodolistsActionType
    | ReturnType<typeof changeTodolistEntityStatusAC>
type ThunkDispatch = Dispatch<ActionsType>