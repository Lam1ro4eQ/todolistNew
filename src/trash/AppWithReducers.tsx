import React, {useReducer, useState} from 'react';
import '../app/App.css';
import {Todolist} from '../features/TodolistsList/Todolist/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from '../components/AddItemForm/AddItemForm';

import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, FilterValuesType,
    removeTodolistAC,
    todolistsReducer
} from '../features/TodolistsList/todolists-reducer';
import {addTaskAC, updateTaskAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from '../features/TodolistsList/tasks-reducer';
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import {TaskPropsType} from "../features/TodolistsList/Todolist/Task/Task";
import {TasksStateType} from "../app/AppWithRedux";




function AppWithReducers() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
        {id: todolistId1, title: "What to learn", filter: "all",  addedDate: '', order: 0, entityStatus:'idle' },
        {id: todolistId2, title: "What to buy", filter: "all",  addedDate: '', order: 0, entityStatus:'idle' }
    ])

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistId1]: [
            {id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, completed: true, addedDate: '',
                order: 0, deadline: '', description:'', priority: TaskPriorities.Low, startDate: '', todoListId: todolistId1},
            {id: v1(), title: "JS", status: TaskStatuses.Completed, completed: true, addedDate: '',
                order: 0, deadline: '', description:'', priority: TaskPriorities.Low, startDate: '', todoListId: todolistId1}

        ],
        [todolistId2]: [
            {id: v1(), title: "Milk", status: TaskStatuses.Completed,completed: true, addedDate: '',
                order: 0, deadline: '', description:'', priority: TaskPriorities.Low, startDate: '', todoListId: todolistId2},
            {id: v1(), title: "React Book", status: TaskStatuses.Completed, completed: true, addedDate: '',
                order: 0, deadline: '', description:'', priority: TaskPriorities.Low, startDate: '', todoListId: todolistId2}
        ]
    });

    function removeTask(id: string, todolistId: string) {
        const action = removeTaskAC(id, todolistId);
        dispatchToTasks(action);
    }

    function addTask(title: string, todolistId: string) {
        const action = addTaskAC(
            {
                id:'11',
                todoListId:todolistId,
                title:title,
                status: TaskStatuses.New,
                completed: true,
                order: 0,
                deadline: "",
                description: "",
                addedDate: "",
                startDate:"",
                priority: TaskPriorities.Low,
                entityStatus:'idle'
            }
        );
        dispatchToTasks(action);
    }

    function changeStatus(id: string, status: TaskStatuses, todolistId: string) {
        const action = updateTaskAC(id, {status}, todolistId);
        dispatchToTasks(action);
    }

    function changeTaskTitle(id: string, newTitle: string, todolistId: string) {
        const action = changeTaskTitleAC(id, newTitle, todolistId);
        dispatchToTasks(action);
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        const action = changeTodolistFilterAC(todolistId, value);
        dispatchToTodolists(action);
    }

    function removeTodolist(id: string) {
        const action = removeTodolistAC(id);
        dispatchToTasks(action);
        dispatchToTodolists(action);
    }

    function changeTodolistTitle(id: string, title: string) {
        const action = changeTodolistTitleAC(id, title);
        dispatchToTodolists(action);
    }

    function addTodolist(title: string) {
        const action = addTodolistAC({
            id: v1(),
            title: title,
            order: 0,
            addedDate:''
        });
        dispatchToTasks(action);
        dispatchToTodolists(action);
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "20px"}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            let allTodolistTasks = tasks[tl.id];
                            let tasksForTodolist = allTodolistTasks;

                            if (tl.filter === "active") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.New);
                            }
                            if (tl.filter === "completed") {
                                tasksForTodolist = allTodolistTasks.filter(t => t.status === TaskStatuses.Completed);
                            }

                            return <Grid key={tl.id} item>
                                <Paper style={{padding: "10px"}}>
                                    <Todolist
                                        todolist={tl}
                                        tasks={tasksForTodolist}
                                        removeTask={removeTask}
                                        changeFilter={changeFilter}
                                        addTask={addTask}
                                        changeTaskStatus={changeStatus}
                                        removeTodolist={removeTodolist}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithReducers;
