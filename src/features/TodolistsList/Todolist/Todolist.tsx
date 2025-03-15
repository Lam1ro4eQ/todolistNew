import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from '../../../components/AddItemForm/AddItemForm';
import {Task} from "./Task/Task";
import {TaskStatuses} from "../../../api/todolist-api";
import {TodolistDomainType} from "../../../model/todolistsSlice";
import {fetschTasksTC, selectTasks} from "../../../model/tasksSlice";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {FilterTasksButton} from "../../../components/FilterTasksButton/FilterTasksButton";
import {TodolistTitle} from "../../../components/TodolistTitle/TodolistTitle";


type PropsType = {
    todolist: TodolistDomainType
    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    disabled?: boolean
}


export const Todolist = React.memo(({disabled = false, ...props}: PropsType) => {

    const dispatch = useAppDispatch()
    let tasks = useAppSelector(selectTasks)

    useEffect(() => {
        dispatch(fetschTasksTC(props.todolist.id))
    }, [])

    const addTask = useCallback((title: string) => {
        props.addTask(title, props.todolist.id);
    }, [props.addTask, props.todolist.id])

    let tasksForTodolist = tasks[props.todolist.id] || []

    if (props.todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }

    return <div>
            <TodolistTitle todolist={props.todolist}/>
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


