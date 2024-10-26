import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";


export type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
    disabled?: boolean
}

export const EditableSpan = React.memo(({disabled = false,...props}: EditableSpanPropsType) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        if (disabled) {
            setEditMode(true);
        }
        setEditMode(false);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField value={title} onChange={changeTitle} disabled={disabled} autoFocus onBlur={activateViewMode}
                     />
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
})
