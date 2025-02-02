import {
    addTask,
    removeTask, setTasks,
    tasksReducer, updateTask,
} from './tasksSlice';
import {addTodolist, removeTodolist, setTodolists} from './todolistsSlice';
import {TaskPriorities, TaskStatuses} from "../../api/todolist-api";
import {TasksStateType} from "../../app/App";

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New,
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
                id: "2", title: "JS", status: TaskStatuses.Completed,
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
                id: "3", title: "React", status: TaskStatuses.New,
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
        "todolistId2": [
            {
                id: "1", title: "bread",
                status: TaskStatuses.New,
                completed: true,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2',
                entityStatus: 'idle'
            },
            {
                id: "2", title: "milk",
                status: TaskStatuses.Completed,
                completed: true,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2',
                entityStatus: 'idle'
            },
            {
                id: "3", title: "tea",
                status: TaskStatuses.New,
                completed: true,
                addedDate: '',
                order: 0,
                deadline: '',
                description: '',
                priority: TaskPriorities.Low,
                startDate: '',
                todoListId: 'todolistId2',
                entityStatus: 'idle'
            }
        ]
    };
})
;

test('correct task should be deleted from correct array', () => {
    const action = removeTask({taskId:"2", todolistId:"todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(2);
    expect(endState["todolistId2"].every(t => t.id != "2")).toBeTruthy();
});
test('correct task should be added to correct array', () => {
    const action = addTask({task:{
        id:'11',
        todoListId:"todolistId2",
        title:"juce",
        status: TaskStatuses.New,
        completed: true,
        order: 0,
        deadline: "",
        description: "",
        addedDate: "",
        startDate:"",
        priority: TaskPriorities.Low,
            entityStatus:'idle'
    }});
    // const action = addTaskAC("juce", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});
test('status of specified task should be changed', () => {
    const action = updateTask({taskId:"2", model:{title: '',
        description: '',
        status: TaskStatuses.New,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: ''}, todolistId:"todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
});
test('title of specified task should be changed', () => {
    const action = updateTask({taskId:"2",model:{title:"yogurt"} ,todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("yogurt");
    expect(endState["todolistId2"][0].title).toBe("bread");
});
test('new array should be added when new todolist is added', () => {
    const action = addTodolist({ todolist: { id: '1', title: 'What to learn', addedDate: '', order: 0} });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});
test('propertry with todolistId should be deleted', () => {
    const action = removeTodolist({todolistId:"todolistId2"});

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {
    const action = setTodolists({todolists:[
        {id: '1', title: 'title 1',  addedDate: '', order: 0},
        {id: '2', title: 'title 2',  addedDate: '', order: 0}
    ]});

    const endState = tasksReducer({}, action)
    const keys = Object.keys(endState)


    expect(keys.length).toBe(2);
    expect(endState["1"]).toStrictEqual([]);
    expect(endState["2"]).toBeDefined();
});

test('tasks should be added when for todolists', () => {
    const action = setTasks({tasks:startState['todolistId1'], todolistId:'todolistId1'});

    const endState = tasksReducer({
        'todolistId2': [],
        'todolistId1': []
    }, action)


    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(0);
});
