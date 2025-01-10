import {addTodolist, TodolistDomainType, todolistsReducer, todolistsSlice} from './todolistsSlice';
import {tasksSlice} from './tasksSlice';
import {TodolistType} from "../../api/todolist-api";
import {TasksStateType} from "../../app/AppWithRedux";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const action = addTodolist({todolist:{id: '1', title: "What to learn",addedDate: '', order: 0}});

    const endTasksState = tasksSlice(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.todolist.id);
    expect(idFromTodolists).toBe(action.payload.todolist.id);
});
