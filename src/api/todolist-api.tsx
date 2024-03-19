import axios from "axios";
import {TaskType} from "../Todolist";


const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    withCredentials: true,
    headers: {
        'API-KEY': ''
    }
})

export const todoListAPI = {
    getTodoList() {
        return instance.get<TodoListType[]>(`todo-lists`)
    },
    updateTodoList(todoID: string, title: string) {
        return instance.put<ResponseType<{item:TodoListType}>>(`todo-lists/${todoID}`, {title})
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{item:TodoListType}>>(`todo-lists`, {title})
    },
    deleteTodoList(todoID: string) {
        return instance.delete<ResponseType<{item:TodoListType}>>(`todo-lists/${todoID}`)
    },
    getTasks() {
        return instance.get<TaskType>(`/todo-lists/${todoID}/tasks`)
    },
}


type TodoListType = {
    addedDate: Date,
    id: string,
    order: number,
    title: string
}

type UpdateAndDeleteTodolistResponseType = {
    data: {},
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}

type ResponseType<T = {}> = {
    data: T,
    messages: string[],
    fieldsErrors: string[],
    resultCode: number
}