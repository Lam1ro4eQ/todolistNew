import axios, {AxiosResponse} from "axios";
import {LoginDataType} from "../features/Login/Login";


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': '66bc136a-cd11-4e15-b397-0a511465a9b0'
    }
})


//api

export const authAPI = {
    login(data: LoginDataType) {
        return instance.post<ResponseType<{ userId: number }>,AxiosResponse<ResponseType<{ userId: number }>>, LoginDataType>(`/auth/login`, data)
    }
}

export const todoListAPI = {
    getTodoList() {
        return instance.get<TodolistType[]>(`todo-lists`)
    },
    updateTodoList(todoID: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todoID}`, {title})
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title})
    },
    deleteTodoList(todoID: string) {
        return instance.delete<ResponseType>(`todo-lists/${todoID}`)
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}

//types
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}
export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}
export type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: TaskStatuses,
    priority: TaskPriorities,
    startDate: string,
    deadline: string,
    id: string,
    todoListId: string,
    order: number,
    addedDate: string
}
export type GetTasksResponse = {
    error: string | null,
    totalCount: number,
    items: TaskType[]
}
export type TodolistType = {
    addedDate: string,
    id: string,
    order: number,
    title: string
}
export type UpdateAndDeleteTodolistResponseType = {
    data: {},
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}
export type ResponseType<T = {}> = {
    data: T,
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}
export type AuthLogin = {
    email: string,
    password: string
}
