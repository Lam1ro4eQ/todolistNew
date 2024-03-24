import axios from "axios";


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
        return instance.put<ResponseType>(`todo-lists/${todoID}`, {title})
    },
    createTodoList(title: string) {
        return instance.post<ResponseType<{ item: TodoListType }>>(`todo-lists`, {title})
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
        return instance.post<ResponseType<TaskType>>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    updateTask(todolistId: string, taskId: string, model:UpdateTaskModelType) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`,{model})
    }
}

export type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}

export type TaskType = {
    description: string,
    title: string,
    completed: boolean,
    status: number,
    priority: number,
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

export type TodoListType = {
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
