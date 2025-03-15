import './App.css';
import {Login} from "../features/Login/Login";
import {Main} from "../components/Main/Main";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom"
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {selectAppIsInitialized, selectAppThemeMode} from "./appSlice";
import {TaskDomainType} from "../model/tasksSlice";
import {meTC} from "../features/Login/authSlice";
import {useAppDispatch, useAppSelector} from "../hooks";
import {getTheme} from "../common/theme";
import React, {useEffect} from "react";
import {CircularProgress, Container, CssBaseline, ThemeProvider} from "@mui/material";
import {Header} from "../components/Header/Header";




function App() {
    const dispatch = useAppDispatch()
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
                            <Route path={'/'} element={<Main/>}/>
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
