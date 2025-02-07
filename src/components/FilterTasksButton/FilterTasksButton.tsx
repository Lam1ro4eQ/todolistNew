import React from "react";
import {FilterValuesType} from "../../features/TodolistsList/todolistsSlice";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Button} from "@mui/material";


type FilterButtonPropsType = {
    title: string,
    filter: FilterValuesType,
    onClickHandler : () => void
}


export const FilterTasksButton = ({title, filter, onClickHandler}:FilterButtonPropsType) => {


    const dispatch = useAppDispatch()


    return (
        <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={'inherit'}
        >All
        </Button>
    )
}