import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {EditableSpan} from '../../../components/EditableSpan/EditableSpan';
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {TaskStatuses} from "../../../api/todolist-api";
import {FilterValuesType, TodolistDomainType} from "../todolistsSlice";
import {fetschTasksTC, selectTasks} from "../tasksSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {FilterTasksButton} from "../../../components/FilterTasksButton/FilterTasksButton";


type PropsType = {
    todolist: TodolistDomainType
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    demo?: boolean
    disabled?: boolean
}


export const Todolist = React.memo(({demo = false,disabled = false, ...props}: PropsType) => {

    const dispatch = useAppDispatch()
    let tasks = useAppSelector(selectTasks)

    useEffect(() => {
        dispatch(fetschTasksTC(props.todolist.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id);
    }, [props.addTask, props.todolist.id])

    const removeTodolist = () => {
        props.removeTodolist(props.todolist.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title);
    }, [props.changeTodolistTitle, props.todolist.id])

    // const onAllClickHandler = useCallback(() => props.changeFilter("all", props.todolist.id), [props.changeFilter, props.todolist.id])
    // const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.todolist.id), [props.changeFilter, props.todolist.id])
    // const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.todolist.id), [props.changeFilter, props.todolist.id])

    let tasksForTodolist = tasks[props.todolist.id] || []

    if (props.todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
        <h3><EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} disabled={props.todolist.entityStatus === 'loading'}/>
            <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
        <div>
            {
                tasksForTodolist.map(t => <Task
                        disabled={props.todolist.entityStatus === 'loading'}
                        task={t}
                        removeTask={props.removeTask}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={props.changeTaskStatus}
                        todolistID={props.todolist.id}
                        key={t.id}
                    />
                )
            }
        </div>
        <FilterTasksButton todolist={props.todolist}/>
    </div>
})


