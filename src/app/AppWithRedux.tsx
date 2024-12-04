import React, {useEffect} from 'react';
import './App.css';
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {Login} from "../features/Login/Login";
import {TaskType} from "../api/todolist-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom"
import {useFormik} from "formik";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch} from "./store";
import {RequestStatusType} from "./app-reducer";
import {TaskDomainType} from "../features/TodolistsList/tasks-reducer";
import {meTC} from "../features/Login/auth-reducer";


export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}
type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = true}: PropsType) {
    const dispatch = useAppDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>((state)=>state.app.status)

    useEffect(()=>{
        dispatch(meTC())
    },[])

    return (
        <div className="App">
            <ErrorSnackbar/>
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress />}
            </AppBar>
            <Container fixed>

                <BrowserRouter>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList demo={demo}/>}/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/404'} element={<h1>404: PAGE NOT FOUND</h1>}/>
                        <Route path='*' element={<Navigate to={'/404'}/>}/>
                    </Routes>
                </BrowserRouter>
            </Container>
        </div>
    );
}

export default AppWithRedux;
