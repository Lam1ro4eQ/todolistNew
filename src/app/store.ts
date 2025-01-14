import {tasksReducer, tasksSlice} from '../features/TodolistsList/tasksSlice';
import {todolistsReducer, todolistsSlice} from '../features/TodolistsList/todolistsSlice';
import {AnyAction, applyMiddleware, combineReducers, compose, createStore} from 'redux';
import {thunk, ThunkDispatch} from "redux-thunk";
import {appReducer, appSlice} from "./appSlice";
import {authReducer} from "../features/Login/authSlice";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer
})
// Добавляем поддержку Redux DevTools
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// непосредственно создаём store
// export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
export const store = configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production' // Включение DevTools только для разработки
    }) // Добавление middleware});
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// создаем тип диспатча который принимает как АС так и ТС
export type AppThunkDispatch = ThunkDispatch<AppRootStateType,any,AnyAction>
// Хуки для использования в компонентах
export const useAppDispatch = () => useDispatch<AppThunkDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент// Для отладки
// @ts-ignore
window.store = store;
