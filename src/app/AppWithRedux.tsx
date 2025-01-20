import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Button,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress, Switch, ThemeProvider,
    Toolbar,
    Typography
} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {Login} from "../features/Login/Login";
import {TaskType} from "../api/todolist-api";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom"
import {useFormik} from "formik";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType, useAppDispatch, useAppSelector} from "./store";
import {changeTheme, RequestStatusType, selectThemeMode, ThemeMode} from "./appSlice";
import {TaskDomainType} from "../features/TodolistsList/tasksSlice";
import {logOutTC, meTC} from "../features/Login/authSlice";
import {getTheme} from "../components/theme/theme";


export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}
type PropsType = {
    demo?: boolean
}

function AppWithRedux({demo = true}: PropsType) {
    const dispatch = useAppDispatch()
    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    const isInitialized = useAppSelector((state) => state.app.isInitialized)
    const isLoggerIn = useAppSelector((state) => state.auth.isLoggedIn)
    const themeMode = useAppSelector(selectThemeMode)
    const theme = getTheme(themeMode)


    const logOut = () => {
        dispatch(logOutTC())
    }

    useEffect(() => {
        dispatch(meTC())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }
    const changeModeHandler = () => {
        dispatch(changeTheme({ themeMode: themeMode === 'light' ? 'dark' : 'light' }));
    }

    return (
        <ThemeProvider theme={theme}>
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
                        {isLoggerIn && <Button color="inherit" onClick={logOut}>Log out</Button>}
                        <Switch color={'default'} onChange={changeModeHandler}/>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress/>}
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
        </ThemeProvider>
    );
}

export default AppWithRedux;
