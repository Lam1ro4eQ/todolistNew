import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Button} from './Button';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import {Task} from "../Task";
import {TaskType} from "../Todolist";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Task> = {
    title: 'Todolists/Task',
    component: Task,

    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        changeTaskTitle: {
            action: 'clicked',
            description: 'changeTaskTitle'
        }
    },
    args: {
        changeTaskStatus: action('changeTaskStatus'),
        removeTask: action('removeTask'),
        task: {id: '11', title: 'JS', isDone: true},
        todolistID: 'qwas12'
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const TaskIsDoneStory: Story = {
    args: {}
};
export const TaskIsNotDoneStory: Story = {
    args: {
        task:
            {id: '11', title: 'CSS', isDone: false}
    }
};


const TaskExample = () => {
    const [task, setTask] = useState({id: '12', title: 'JS', isDone: false})
    return <Task
        changeTaskTitle={(taskId: string, title: string) => setTask({...task, title: title})}
        changeTaskStatus={() => setTask({...task, isDone: !task.isDone})}
        removeTask={action('remove task')}
        task={task}
        todolistID={'todolistID'}/>
}

export const TaskStory: Story = {
    render: () => <TaskExample/>
}

