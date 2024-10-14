import {
    addTodolistAC, changeTodolistEntityStatusAC,
    changeTodolistTitleAC,
    removeTodolistAC, setTodolistsAC, TodolistDomainType,
    todolistsReducer
} from './todolists-reducer';
import {v1} from 'uuid';
import {RequestStatusType} from "../../app/app-reducer";


let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType> = [];

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: '', order: 0, entityStatus: 'idle'}
    ]
})

test('correct todolist should be removed', () => {
    const endState = todolistsReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    // let newTodolistTitle = {
    //     title:"",
    //     order:0,
    //     id:'12',
    //     addedDate:''
    // };

    const endState = todolistsReducer(startState, addTodolistAC({
        id: todolistId1,
        title: "What to learn",
        addedDate: '',
        order: 0
    }))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("What to learn");
    expect(endState[0].filter).toBe("all");
});

test('correct todolist should change its name', () => {
    let newTodolistTitle = "New Todolist";

    const action = changeTodolistTitleAC(todolistId2, newTodolistTitle);

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('todolist should be set to the state', () => {

    const action = setTodolistsAC(startState);

    const endState = todolistsReducer([], action);

    expect(endState.length).toBe(2);
});

test('correct entity status of todolist should be changet', () => {
    let newStatus: RequestStatusType = 'failed'
    let action = changeTodolistEntityStatusAC(todolistId1, newStatus)
    const endState = todolistsReducer(startState, action)


    expect(endState[0].entityStatus).toBe(newStatus);
    expect(endState[1].entityStatus).toBe("idle");
});

