import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../../components/EditableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStatuses, TaskType} from "../../../../api/todolist-api";
import {TaskDomainType} from "../../tasks-reducer";
import {RequestStatusType} from "../../../../app/appSlice";

export type TaskPropsType = {
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    task: TaskDomainType
    todolistID: string
    disabled?: boolean
}
export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todolistID)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistID);
    }
    const onTitleChangeHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistID);
    }, [props.changeTaskTitle, props.task.id, props.todolistID])
    console.log(`tasksk for ${props.todolistID}`, props.task)

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