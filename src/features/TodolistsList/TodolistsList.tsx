import {Grid, Paper} from "@mui/material";
import React, {useCallback} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Todolist} from "./Todolist/Todolist";
import {addTaskTC, removeTaskTC, updateTaskTC} from "../../model/tasksSlice";
import {TaskStatuses} from "../../api/todolist-api";
import {selectTodolist} from "../../model/todolistsSlice";

export const TodolistsList = () => {

    const todolists = useAppSelector(selectTodolist)
    const dispatch = useAppDispatch()

    const removeTask = useCallback((id: string, todolistId: string) => {
        const thunk = removeTaskTC(id, todolistId)
        dispatch(thunk)
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk = addTaskTC(title, todolistId);
        dispatch(thunk);
    }, [dispatch])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        const thunk = updateTaskTC(id, {status}, todolistId);
        dispatch(thunk);
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId);
        dispatch(thunk);
    }, [dispatch])



    return (
        <>
            {
                todolists.map(tl => {
                    return <Grid item key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                todolist={tl}
                                removeTask={removeTask}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                changeTaskTitle={changeTaskTitle}

                                                           />
                        </Paper>
                    </Grid>
                })
            }
        </>
    )
}