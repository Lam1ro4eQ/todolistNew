import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import React, {useState} from "react";
import {Task} from "../features/TodolistsList/Todolist/Task/Task";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {RequestStatusType} from "../app/appSlice";

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
        task: {
            id: '11',
            title: 'JS',
            status: TaskStatuses.Completed,
            description: '',
            completed: true,
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: '',
            order: 0,
            addedDate: '',
            entityStatus:'idle' as RequestStatusType
        },
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
            {
                id: '11', title: 'CSS',
                status: TaskStatuses.New,
                description: '',
                completed: true,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: '',
                order: 0,
                addedDate: '',
                entityStatus:'idle' as RequestStatusType
            }
    }
};


const TaskExample = () => {
    const [task, setTask] = useState({
        id: '12',
        title: 'JS',
        status: TaskStatuses.New,
        description: '',
        completed: true,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        todoListId: '',
        order: 0,
        addedDate: '',
        entityStatus:'idle' as RequestStatusType
    })
    return <Task
        changeTaskTitle={(taskId: string, title: string) => setTask({...task, title: title})}
        changeTaskStatus={() => setTask({...task, status: TaskStatuses.Completed})}
        removeTask={action('remove task')}
        task={task}
        todolistID={'todolistID'}/>
}

export const TaskStory: Story = {
    render: () => <TaskExample/>
}

