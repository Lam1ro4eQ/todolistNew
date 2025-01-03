import {
    AddTodolistActionType, changeTodolistEntityStatusAC,
    FilterValuesType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from './todolists-reducer';
import {Dispatch} from "redux";
import {
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todoListAPI,
    TodolistType,
    UpdateTaskModelType
} from "../../api/todolist-api";
import {AppRootStateType} from "../../app/store";
import {
    RequestStatusType,
    setAppErrorAC,
    SetAppErrorActionType,
    setAppStatusAC,
    SetAppStatusActionType
} from "../../app/appSlice";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {TasksStateType} from "../../app/AppWithRedux";


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {...state, [action.todolistId]: state[action.todolistId].filter(t => t.id != action.taskId)}

        case 'ADD-TASK':
            return {...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]]}

        case 'UPDATE-TASK':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, ...action.model} : t)
            }

        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t)
            }

        case 'ADD-TODOLIST':
            return {...state, [action.todolist.id]: []}

        case 'REMOVE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;

        case "SET-TODOLISTS": {
            const stateCopy = {...state}
            action.todolists.forEach(tl => {
                stateCopy[tl.id] = []
            })
            return stateCopy

        }

        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}

        case "CHANGE-TASK-ENTITY-STATUS":
            return {
                ...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, entityStatus: action.entityStatus} : t)
            }

        default:
            return state;
    }
}
// action
export const removeTaskAC = (taskId: string, todolistId: string) =>
    ({type: 'REMOVE-TASK', taskId, todolistId} as const)
export const addTaskAC = (task: TaskDomainType) =>
    ({type: 'ADD-TASK', task} as const)
export const updateTaskAC = (taskId: string, model: UpdateTaskDomainModelType, todolistId: string) =>
    ({type: 'UPDATE-TASK', model, todolistId, taskId} as const)
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string) =>
    ({type: 'CHANGE-TASK-TITLE', title, todolistId, taskId} as const)
export const setTasksAC = (tasks: Array<TaskDomainType>, todolistId: string) =>
    ({type: 'SET-TASKS', tasks, todolistId} as const)
export const clearTasks = ()=> {return {}}
export const changeTaskEntityStatusAC = (taskId: string, todolistId: string, entityStatus: RequestStatusType) => {
    return {type: 'CHANGE-TASK-ENTITY-STATUS', taskId, todolistId, entityStatus} as const
}

//thunks
export const fetschTasksTC = (todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'));
    todoListAPI.getTasks(todolistId)
        .then(res => {
            // console.log(res.data.items)
            const newTask = res.data.items.map(t => ({...t, entityStatus: 'idle' as RequestStatusType}))
            // console.log(newTask, todolistId)
            dispatch(setTasksAC(newTask, todolistId))
            // dispatch(setTasksAC(newTask, todolistId))
            dispatch(setAppStatusAC('succeeded'));
        })

}

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: ThunkDispatch) => {
    dispatch(setAppStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(taskId, todolistId, 'loading'))
    todoListAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if (res.data.resultCode === 0) {
                const action = removeTaskAC(taskId, todolistId);
                dispatch(action);
                dispatch(setAppStatusAC('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
}

export const addTaskTC = (title: string, todolistId: string) => (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
    dispatch(setAppStatusAC('loading'));
    todoListAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                console.log(res.data.data.item)
                const newTask = {}
                // dispatch(addTaskAC(res.data.data.item))
                dispatch(addTaskAC({...res.data.data.item, entityStatus: 'idle' as RequestStatusType}))
                dispatch(setAppStatusAC('succeeded'));
            } else {
                handleServerAppError(res.data, dispatch)
            }
        })
        .catch((error) => {
            handleServerNetworkError(error.message, dispatch)
        })
}

export const updateTaskTC = (taskId: string, domainModel: UpdateTaskDomainModelType, todolistId: string) =>
    (dispatch: ThunkDispatch, getState: () => AppRootStateType) => {
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
                    dispatch(updateTaskAC(taskId, domainModel, todolistId))
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

type ActionsType =
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskTitleAC>
    | ReturnType<typeof setTasksAC>
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | ReturnType<typeof changeTaskEntityStatusAC>

type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType | SetAppErrorActionType>

export type TaskDomainType = TaskType & {
    entityStatus?: RequestStatusType
}

