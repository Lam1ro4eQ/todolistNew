import './App.css';
import {Menu} from "@mui/icons-material";
import {Login} from "../features/Login/Login";
import {TodolistsList} from "../features/TodolistsList/TodolistsList";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom"
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {changeTheme, selectAppIsInitialized, selectAppStatus, selectAppThemeMode} from "./appSlice";
import {TaskDomainType} from "../features/TodolistsList/tasksSlice";
import {logOutTC, meTC, selectAuthLogged} from "../features/Login/authSlice";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getTheme} from "../components/theme";
import Toolbar from "@mui/material/Toolbar"
import React, {useEffect} from "react";
import {FilterTasksButton} from "../components/FilterTasksButton/FilterTasksButton";
import {
    AppBar,
    Box,
    CircularProgress,
    Container,
    IconButton,
    LinearProgress,
    Switch,
    ThemeProvider
} from "@mui/material";
import {filterButtonsContainerSx} from "../components/FilterTasksButton/FilterTasksButtons.styles";
import {MenuButton} from "../components/MenuButton/MenuButton";

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
    const themeMode = useAppSelector(selectAppThemeMode)
    const isLoggerIn = useAppSelector(selectAuthLogged)

    const changeModeHandler = () => {
        dispatch(changeTheme({ themeMode: themeMode === 'light' ? 'dark' : 'light' }));
    }

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


    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <ErrorSnackbar/>
                <AppBar position="static">
                    <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <Menu/>
                        </IconButton>
                        <Box sx={filterButtonsContainerSx}>
                            <MenuButton color="inherit" >News</MenuButton>
                            {isLoggerIn && <MenuButton background="green" color="inherit" onClick={logOut}>Log out</MenuButton>}
                            <Switch color={'default'} onChange={changeModeHandler}/>
                        </Box>
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

export default App;
