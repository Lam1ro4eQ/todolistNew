import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses} from "../../../../api/todolist-api";
import {removeTaskTC, TaskDomainType, updateTaskTC} from "../../../../model/tasksSlice";
import {useAppDispatch} from "../../../../hooks";

export type TaskPropsType = {
    task: TaskDomainType
    todolistID: string
    disabled?: boolean
}
export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useAppDispatch()

    const changeTaskTitle = (id: string, newTitle: string, todolistId: string) => {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId);
        dispatch(thunk);
    }

    const changeTaskStatus = (id: string, status: TaskStatuses, todolistId: string) => {
        const thunk = updateTaskTC(id, {status}, todolistId);
        dispatch(thunk);
    }

    const removeTask = (id: string, todolistId: string) => {
        dispatch(removeTaskTC(id, todolistId))
    }

    const onClickHandler = () => removeTask(props.task.id, props.todolistID)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistID);
    }





    const onTitleChangeHandler = useCallback((newValue: string) => {
        changeTaskTitle(props.task.id, newValue, props.todolistID);
    }, [props.task.id, props.todolistID])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            checked={props.task.status === TaskStatuses.Completed }
            color="primary"
            onChange={onChangeHandler}
            disabled={props.task.entityStatus === 'loading'|| props.disabled}
        />

        <EditableSpan value={props.task.title} onChange={onTitleChangeHandler} disabled={props.task.entityStatus === 'loading' || props.disabled}/>
        <IconButton onClick={onClickHandler} disabled={props.task.entityStatus === 'loading' || props.disabled}>
            <Delete/>

        </IconButton>
    </div>
})