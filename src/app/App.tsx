import './App.css';
import {Menu} from "@mui/icons-material";
import {Login} from "../features/Login/Login";
import {TodolistsList} from "../model/TodolistsList";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {changeTheme, selectAppIsInitialized, selectAppStatus, selectAppThemeMode} from "./appSlice";
import {TaskDomainType} from "../model/tasksSlice";
import {logOutTC, meTC, selectAuthLogged} from "../features/Login/authSlice";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getTheme} from "../common/theme";
import Toolbar from "@mui/material/Toolbar"
import React, {useEffect} from "react";
import {
    AppBar,
    Box,
    CircularProgress,
    Container, CssBaseline,
    IconButton,
    LinearProgress,
    Switch,
    ThemeProvider
} from "@mui/material";
import {filterButtonsContainerSx} from "../components/FilterTasksButton/FilterTasksButtons.styles";
import {MenuButton} from "../components/MenuButton/MenuButton";
import {Header} from "../components/Header/Header";

export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}
type PropsType = {
    demo?: boolean
}

function App({demo = true}: PropsType) {
    const dispatch = useAppDispatch()
    const status = useAppSelector(selectAppStatus)
    const isInitialized = useAppSelector(selectAppIsInitialized)
    const themeMode = useAppSelector(selectAppThemeMode)
    const theme = getTheme(themeMode)


    useEffect(() => {
        dispatch(meTC())
    }, [])

    if (!isInitialized) {
        return <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
            <CircularProgress/>
        </div>
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <div className="App">
                <ErrorSnackbar/>
                    <Header/>
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

export default App;
