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
    useEffect(() => {
        const title = "css"
        todoListAPI.createTodoList(title)
            .then((res)=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoID = '6d69124a-ea6e-4bee-921e-8d667daf9e01'
        todoListAPI.deleteTodoList(todoID)
            .then((res)=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoID = '986c893a-7c74-4e32-99c9-b59c6da1ded8'
        const title = "REACT4"
        todoListAPI.updateTodoList(todoID,title)
            .then((res)=>setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

