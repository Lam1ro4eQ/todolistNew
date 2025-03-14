import React from "react";
import {changeTodolistFilter, FilterValuesType, TodolistDomainType} from "../../model/todolistsSlice";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Box, Button} from "@mui/material";
import {filterButtonsContainerSx} from "./FilterTasksButtons.styles";

type Props = {
    todolist: TodolistDomainType
}

export const FilterTasksButton = ({todolist}:Props) => {
    const { filter, id } = todolist

    const dispatch = useAppDispatch()

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        dispatch(changeTodolistFilter({ id, filter }))
    }

    return (
        <Box sx={filterButtonsContainerSx}>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={() => changeFilterTasksHandler('all')}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={() => changeFilterTasksHandler('active')}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={() => changeFilterTasksHandler('completed')}
                    color={'secondary'}>Completed
            </Button>
        </Box>
    )
}