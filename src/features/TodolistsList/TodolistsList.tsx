import React, {useCallback, useEffect} from "react";
import {Grid, Paper} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppSelector} from "../../app/store";
import {TaskStatuses} from "../../api/todolist-api";
import {TasksStateType} from "../../app/AppWithRedux";
import {AddItemForm} from '../../components/AddItemForm/AddItemForm';
import {
    addTodolistTC,
    changeTodolistFilter,
    changeTodolistTitleTC,
    fetschTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from './todolistsSlice';
import {addTaskTC, removeTaskTC, updateTaskTC} from './tasksSlice';
import {Todolist} from "./Todolist/Todolist";
import {Navigate} from "react-router-dom";

type PropsType = {
    demo?: boolean
}
export const TodolistsList: React.FC<PropsType> = ({demo = false}) => {

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    // const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch<any>();
    const isLoggerIn = useAppSelector((state) => state.auth.isLoggedIn)

    useEffect(() => {
        if (!isLoggerIn) return
        dispatch(fetschTodolistsTC())
    }, [])

    const removeTask = useCallback((id: string, todolistId: string) => {
        const thunk = removeTaskTC(id, todolistId)
        dispatch(thunk)
    }, [])

    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk = addTaskTC(title, todolistId);
        dispatch(thunk);
    }, [dispatch])

    const changeStatus = useCallback((id: string, status: TaskStatuses, todolistId: string) => {
        const thunk = updateTaskTC(id, {status}, todolistId);
        dispatch(thunk);
    }, [dispatch])

    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        const thunk = updateTaskTC(id, {title: newTitle}, todolistId);
        dispatch(thunk);
    }, [dispatch])

    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilter({id:todolistId,filter:value}))
    }, [dispatch])

    const removeTodolist = useCallback((id: string) => {
        const thunk = removeTodolistTC(id);
        dispatch(thunk);
    }, [])

    const changeTodolistTitle = useCallback((id: string, title: string) => {
        const thunk = changeTodolistTitleTC(id, title);
        dispatch(thunk);
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title);
        dispatch(thunk);
    }, [dispatch])

    if (!isLoggerIn) {
        return <Navigate to={'Login'}/>
    }
    return <>
        <Grid container style={{padding: "20px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container spacing={3}>
            {
                todolists.map(tl => {
                    // let allTodolistTasks = tasks[tl.id];
                    // let tasksForTodolist = allTodolistTasks;
                    return <Grid item key={tl.id}>
                        <Paper style={{padding: "10px"}}>
                            <Todolist
                                todolist={tl}
                                // tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeStatus}
                                removeTodolist={removeTodolist}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                demo={demo}
                            />
                        </Paper>
                    </Grid>

                })
            }
        </Grid>
    </>
}

