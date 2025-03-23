import Toolbar from "@mui/material/Toolbar";
import {AppBar, Box, IconButton, LinearProgress, Switch} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {filterButtonsContainerSx} from "../../../features/TodolistsList/ui/TodolistsList/Todolist/FilterTasksButton/FilterTasksButtons.styles";
import {MenuButton} from "../MenuButton/MenuButton";
import React from "react";
import {changeTheme, selectAppStatus, selectAppThemeMode} from "../../../app/appSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {logOutTC, selectAuthLogged} from "../../../features/Login/authSlice";

export const Header = () => {

    const dispatch = useAppDispatch()
    const isLoggerIn = useAppSelector(selectAuthLogged)
    const themeMode = useAppSelector(selectAppThemeMode)
    const status = useAppSelector(selectAppStatus)

    const logOut = () => {
        dispatch(logOutTC())
    }

    const changeModeHandler = () => {
        dispatch(changeTheme({themeMode: themeMode === 'light' ? 'dark' : 'light'}));
    }

    return (
        <AppBar position="static">
            <Toolbar sx={{display: "flex", justifyContent: "space-between"}}>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <Menu/>
                </IconButton>
                <Box sx={filterButtonsContainerSx}>
                    <MenuButton color="inherit">News</MenuButton>
                    {isLoggerIn && <MenuButton background="green" color="inherit" onClick={logOut}>Log out</MenuButton>}
                    <Switch color={'default'} onChange={changeModeHandler}/>
                </Box>
            </Toolbar>
            {status === 'loading' && <LinearProgress/>}
        </AppBar>
    )
}