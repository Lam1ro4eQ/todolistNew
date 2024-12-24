import React from 'react'
import {Provider} from "react-redux";
import {AppRootStateType, store} from "../../app/store";
import {applyMiddleware, combineReducers, createStore, legacy_createStore} from "redux";
import {tasksReducer} from '../../features/TodolistsList/tasks-reducer';
import {todolistsReducer} from "../../features/TodolistsList/todolists-reducer";
import {v1} from "uuid";
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {appReducer} from "../../app/app-reducer";
import {thunk} from "redux-thunk";
import {authReducer} from "../../features/Login/auth-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'loading'}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(),
                title: "HTML&CSS",
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId1',
                entityStatus: 'idle'
            },
            {
                id: v1(),
                title: "JS",
                status: TaskStatuses.New,
                completed: true,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId1',
                entityStatus: 'idle'

            }
        ],
        ["todolistId2"]: [
            {
                id: v1(),
                title: "Milk",
                status: TaskStatuses.New,
                completed: true,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2',
                entityStatus:'idle'
            },
            {
                id: v1(),
                title: "React Book",
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2',
                entityStatus:'idle'
            }
        ]
    },
    app: {
        error: null,
        status: 'idle',
        isInitialized: false
    },
    auth: {
        isLoggedIn: false // или true, если пользователь авторизован
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState, applyMiddleware(thunk));


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
