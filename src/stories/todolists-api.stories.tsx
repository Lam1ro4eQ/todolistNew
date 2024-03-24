import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todoListAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todoListAPI.getTodoList()
            .then((res) => {
                setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)

    const createTodolist = () => {
        todoListAPI.createTodoList(title)
            .then((res) => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"title"} value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
            <button onClick={createTodolist}>create todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState<any>(null)

    const deleteTodolist = () => {
        todoListAPI.deleteTodoList(todoID)
            .then((res) => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todoID} onChange={(e)=>{setTodoID(e.currentTarget.value)}}/>
            <button onClick={deleteTodolist}>delete todolist</button>
        </div>
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<any>(null)
    const [todoID, setTodoID] = useState<any>(null)

    const updateTodolist = () => {
        todoListAPI.updateTodoList(todoID, title)
            .then((res) => setState(res.data))
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todoID} onChange={(e)=>{setTodoID(e.currentTarget.value)}}/>
            <input placeholder={"title"} value={title} onChange={(e)=>{setTitle(e.currentTarget.value)}}/>
            <button onClick={updateTodolist}>update todolist</button>
        </div>
    </div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    const [todoID, setTodoID] = useState<any>(null)

    const getTasks = () => {
        todoListAPI.getTasks(todoID)
            .then((res) => {
                setState(res.data)
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todoID} onChange={(e)=>{setTodoID(e.currentTarget.value)}}/>
            <button onClick={getTasks}>Get tasks</button>
        </div>
    </div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)

    const deleteTask = () => {

        todoListAPI.deleteTask(todolistId, taskId)
            .then((res) => setState(res.data))
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>

            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoID = '3118c97b-45cf-4351-bd41-353195aefc10'
        const title = 'New Task111'
        todoListAPI.createTask(todoID, title)
            .then((res) => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
