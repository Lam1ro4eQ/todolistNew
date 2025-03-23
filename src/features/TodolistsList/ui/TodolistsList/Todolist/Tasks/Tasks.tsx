import React from "react";
import {TaskStatuses} from "../../../../../../api/todolist-api";
import {useAppSelector} from "../../../../../../hooks";
import {selectTasks} from "../../../../model/tasksSlice";
import {TodolistDomainType} from "../../../../model/todolistsSlice";
import {Task} from "./Task/Task";

type PropsType = {
    todolist: TodolistDomainType
}

export const Tasks = React.memo((props: PropsType) => {

    let tasks = useAppSelector(selectTasks)

    let tasksForTodolist = tasks[props.todolist.id] || []

    if (props.todolist.filter === "active") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New);
    }
    if (props.todolist.filter === "completed") {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed);
    }


    return (
        <>
            {
                tasksForTodolist.map(t => <Task
                        disabled={props.todolist.entityStatus === 'loading'}
                        task={t}
                        todolistID={props.todolist.id}
                        key={t.id}
                    />
                )
            }
        </>
    )
})