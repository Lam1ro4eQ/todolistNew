import {Dispatch} from "redux";
import {TaskPriorities, TaskStatuses, TaskType, todoListAPI, UpdateTaskModelType} from "../api/todolist-api";
import {AppRootStateType} from "../app/store";
import {RequestStatusType, setAppStatus,} from "../app/appSlice";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {createSlice} from "@reduxjs/toolkit";
import {addTodolist, removeTodolist} from "./todolistsSlice";


export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {} as TasksStateType,
    reducers : create=> ({
        setTasks: create.reducer<{tasks: Array<TaskDomainType>, todolistId: string}>((state,action)=> {
            state[action.payload.todolistId]= action.payload.tasks
        }),
        removeTask: create.reducer<{taskId: string, todolistId: string}>((state,action)=> {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id == action.payload.taskId)
            if (index !== -1) tasks.splice(index,1)
        }),
        addTask: create.reducer<{task: TaskDomainType}>((state,action)=> {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift(action.payload.task)
        }),
        updateTask: create.reducer<{taskId: string, model: UpdateTaskDomainModelType, todolistId: string}>((state, action)=> {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) {
                tasks[index] = {...tasks[index], ...action.payload.model}
            }
        }),
        clearTasks: create.reducer<undefined>((state,action)=> {
            return {}
        }),
        changeTaskEntityStatus: create.reducer<{taskId: string, todolistId: string, entityStatus: RequestStatusType}>((state,action) => {
            // return {
            //     ...state, [action.todolistId]: state[action.todolistId]
            //         .map(t => t.id === action.taskId ? {...t, entityStatus: action.entityStatus} : t)
            // }
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex(task => task.id === action.payload.taskId)
            if (index !== -1) {
                tasks[index].entityStatus = action.payload.entityStatus
            }
        })

    }),
    extraReducers: (builder) => {
        builder.addCase(addTodolist, (state,action)=> {
            state[action.payload.todolist.id] = []
        })
            .addCase(removeTodolist,(state,action) => {
                delete state[action.payload.todolistId]
            })
    },
    selectors: {
        selectTasks:(state) => state
    }
})

export const {
    setTasks,
    removeTask,
    addTask,
    updateTask,
    clearTasks,
    changeTaskEntityStatus,
} = tasksSlice.actions
export const tasksReducer = tasksSlice.reducer
export const { selectTasks } = tasksSlice.selectors





//thunks
export const fetschTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}));
    todoListAPI.getTasks(todolistId)
        .then(res => {
            const newTasks = res.data.items.map(t => ({...t, entityStatus: 'idle' as RequestStatusType}))
            dispatch(setTasks({tasks:newTasks, todolistId}))
            dispatch(setAppStatus({status: 'succeeded'}));
        })

}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status: 'loading'}))
    dispatch(changeTaskEntityStatus({taskId, todolistId, entityStatus:'loading'}))
    todoListAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                const action = removeTask({taskId, todolistId});
                dispatch(action);
                dispatch(setAppStatus({status: 'succeeded'}))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setAppStatus({status:'loading'}));
    todoListAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                console.log(res.data.data.item)
                const newTask = {...res.data.data.item,entityStatus:'idle' as RequestStatusType}
                // dispatch(addTaskAC(res.data.data.item))
                dispatch(addTask({task:newTask}))
                dispatch(setAppStatus({status: 'succeeded'}));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateTaskDomainModelType, todolistId: string) =>
    (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const state = getState()
        const task = state.tasks[todolistId].find(t => t.id === taskId)
        if (!task) {
            //throw new Error("task not found the state")
            console.warn("task not found the state")
            return;
        }
        const apiModel: UpdateTaskModelType = {
            title: task.title,
            description: task.description,
            status: task.status,
            priority: task.priority,
            startDate: task.startDate,
            deadline: task.deadline,
            ...domainModel
        }
        todoListAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTask({taskId, model:domainModel, todolistId}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error) => {
                handleServerNetworkError(error.message, dispatch)
            })
    }


//types
type UpdateTaskDomainModelType = {
    title?: string
    description?: string
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
    entityStatus?: RequestStatusType
}

export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}


export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}

