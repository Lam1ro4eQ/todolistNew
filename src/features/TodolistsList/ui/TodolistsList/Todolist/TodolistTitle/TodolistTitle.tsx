import React, {useCallback} from "react";
import {EditableSpan} from "../../../../../../common/components/EditableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {changeTodolistTitleTC, removeTodolistTC, selectTodolist, TodolistDomainType} from "../../../../model/todolistsSlice";
import {useAppDispatch, useAppSelector} from "../../../../../../hooks";

type Props = {
    todolist: TodolistDomainType
}

export const TodolistTitle = ({todolist}:Props) => {

    const dispatch = useAppDispatch()

    const removeTodolist = useCallback(() => {
        const thunk = removeTodolistTC(todolist.id);
        dispatch(thunk);
    }, [])

    const changeTodolistTitle = useCallback((title: string) => {
        const thunk = changeTodolistTitleTC(todolist.id, title);
        dispatch(thunk);
    }, [dispatch])



    return (
        <h3><EditableSpan value={todolist.title} onChange={changeTodolistTitle} disabled={todolist.entityStatus === 'loading'}/>
            <IconButton onClick={removeTodolist} disabled={todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
    )
}