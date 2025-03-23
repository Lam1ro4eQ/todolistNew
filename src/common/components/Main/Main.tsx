import React, {useCallback, useEffect} from "react";
import {Grid} from "@mui/material";
import {AddItemForm} from '../AddItemForm/AddItemForm';
import {addTodolistTC, fetschTodolistsTC,} from '../../../features/TodolistsList/model/todolistsSlice';
import {Navigate} from "react-router-dom";
import {selectAuthLogged} from "../../../features/Login/authSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {TodolistsList} from "../../../features/TodolistsList/ui/TodolistsList/TodolistsList";


export const Main = () => {

    const dispatch = useAppDispatch()
    const isLoggerIn = useAppSelector(selectAuthLogged)

    useEffect(() => {
        if (!isLoggerIn) return
        dispatch(fetschTodolistsTC())
    }, [])



    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title);
        dispatch(thunk);
    }, [dispatch])

    if (!isLoggerIn) {
        return <Navigate to={'Login'}/>
    }
    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            <TodolistsList/>
        </Grid>
    </>
}

