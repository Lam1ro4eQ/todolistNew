import {Grid, Paper} from "@mui/material";
import React from "react";
import {useAppSelector} from "../../../../hooks";
import {Todolist} from "./Todolist/Todolist";
import {selectTodolist} from "../../model/todolistsSlice";

export const TodolistsList = () => {

    const todolists = useAppSelector(selectTodolist)

    return (
        <>
            {
                todolists.map(tl => {
                    return <Grid item key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                            <Todolist todolist={tl}/>
                        </Paper>
                    </Grid>
                })
            }
        </>
    )
}