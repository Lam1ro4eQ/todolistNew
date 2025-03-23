import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../../../common/components/AddItemForm/AddItemForm';
import {TodolistDomainType} from "../../../model/todolistsSlice";
import {addTaskTC, fetschTasksTC} from "../../../model/tasksSlice";
import {useAppDispatch} from "../../../../../hooks";
import {FilterTasksButton} from "./FilterTasksButton/FilterTasksButton";
import {TodolistTitle} from "./TodolistTitle/TodolistTitle";
import {Tasks} from "./Tasks/Tasks";


type PropsType = {
    todolist: TodolistDomainType
    disabled?: boolean
}


export const Todolist = React.memo(({disabled = false, ...props}: PropsType) => {

    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetschTasksTC(props.todolist.id))
    }, [])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskTC(title, props.todolist.id));
    }, [props.todolist.id])



    return <div>
        <TodolistTitle todolist={props.todolist}/>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            <Tasks todolist={props.todolist}/>
        </div>
        <FilterTasksButton todolist={props.todolist}/>
    </div>
})


