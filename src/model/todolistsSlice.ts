import {todoListAPI, TodolistType} from "../api/todolist-api";
import {RequestStatusType, setAppStatus} from "../app/appSlice";
import {createSlice} from "@reduxjs/toolkit";


export const todolistsSlice = createSlice({
    name: 'todolists',
    initialState: [] as TodolistDomainType[],
    reducers: (create) => {
        return {
            setTodolists: create.reducer<{ todolists: TodolistType[] }>((state, action) => {
                // return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
                action.payload.todolists.forEach((tl) => {
                    state.push({...tl, filter: 'all', entityStatus: 'idle'})
                })
            }),
            removeTodolist: create.reducer<{ todolistId: string }>((state, action) => {
                // return state.payload.filter(tl => tl.id != action.id)
                const index = state.findIndex((todo) => todo.id == action.payload.todolistId)
                if (index !== -1) {
                    state.splice(index, 1)
                }
            }),
            addTodolist: create.reducer<{ todolist: TodolistType }>((state, action) => {
                // return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
                const newTodolist: TodolistDomainType = {
                    ...action.payload.todolist,
                    filter: "all",
                    entityStatus: "idle"
                }
                state.unshift(newTodolist)
            }),
            changeTodolistTitle: create.reducer<{ id: string, title: string }>((state, action) => {
                // return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
                const index = state.findIndex(todo => todo.id == action.payload.id)
                if (index !== -1) {
                    state[index].title = action.payload.title
                }
            }),
            changeTodolistFilter: create.reducer<{ id: string, filter: FilterValuesType }>((state, action) => {
                // return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
                const index = state.findIndex(todo => todo.id == action.payload.id)
                if (index !== -1) {
                    state[index].filter = action.payload.filter
                }
            }),
            changeTodolistEntityStatus: create.reducer<{ id: string, entityStatus: RequestStatusType }>((state, action) => {
                const index = state.findIndex(todo => todo.id == action.payload.id)
                if (index !== -1) {
                    state[index].entityStatus = action.payload.entityStatus
                }
            }),
            clearTodolist: create.reducer<undefined>((state, action) => {
                return []
            })
        }
    },
    selectors: {
        selectTodolist: state => state
    }
})
export const {
    setTodolists,
    removeTodolist,
    addTodolist,
    changeTodolistTitle,
    changeTodolistFilter,
    changeTodolistEntityStatus,
    clearTodolist
} = todolistsSlice.actions
export const todolistsReducer = todolistsSlice.reducer
export type TodolistsStateType = ReturnType<typeof todolistsSlice.getInitialState>
export const { selectTodolist } = todolistsSlice.selectors


//thunks
export const fetschTodolistsTC = () => {
    return (dispatch: any) => {
        dispatch(setAppStatus({status: 'loading'}))
        todoListAPI.getTodoList()
            .then((res) => {
                console.log(res.data)
                dispatch(setTodolists({todolists: res.data}))
                dispatch(setAppStatus({status: 'succeeded'}))
            })
    }
}

export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: any) => {
        dispatch(setAppStatus({status: 'loading'}))
        dispatch(changeTodolistEntityStatus({id: todolistId, entityStatus: 'loading'}))
        todoListAPI.deleteTodoList(todolistId)
            .then((res) => {
                dispatch(removeTodolist({todolistId: todolistId}))
                dispatch(setAppStatus({status: 'succeeded'}))
            })
    }
}

export const addTodolistTC = (title: string) => {
    return (dispatch: any) => {
        dispatch(setAppStatus({status: 'loading'}));
        todoListAPI.createTodoList(title)
            .then((res) => {
                dispatch(addTodolist({todolist: res.data.data.item}))
                dispatch(setAppStatus({status: 'succeeded'}));
            })
    }
}

export const changeTodolistTitleTC = (todoID: string, title: string) => {
    return (dispatch: any) => {
        dispatch(setAppStatus({status: 'loading'}));
        todoListAPI.updateTodoList(todoID, title)
            .then((res) => {
                dispatch(changeTodolistTitle({id: todoID, title}))
                dispatch(setAppStatus({status: 'succeeded'}));
            })
    }
}
//types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}
