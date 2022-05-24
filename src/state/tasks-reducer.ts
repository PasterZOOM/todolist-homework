import {v1} from 'uuid';
import {TasksStateType} from '../App';
import {AddTodolistAT, RemoveTodolistAT} from './todolists-reducer';

type AddTaskAT = {
    type: 'ADD-TASK'
    title: string
    todolistId: string
}
type RemoveTaskAT = {
    type: 'REMOVE-TASK'
    id: string
    todolistId: string
}
type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS'
    isDone: boolean
    todolistId: string
    id: string
}
type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE'
    title: string
    todolistId: string
    id: string
}

type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodolistAT | RemoveTodolistAT

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)
            }
        case 'ADD-TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(
                    t => t.id === action.id ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(
                    t => t.id === action.id ? {...t, title: action.title} : t)
            }
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            delete state[action.id]
            return {...state,}
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
    return {type: 'ADD-TASK', title: title, todolistId: todolistId}
}
export const removeTaskAC = (id: string, todolistId: string): RemoveTaskAT => {
    return {type: 'REMOVE-TASK', id: id, todolistId: todolistId}
}
export const changeTaskStatusAC =
    (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusAT => {
        return {type: 'CHANGE-TASK-STATUS', isDone: isDone, todolistId: todolistId, id: id}
    }
export const changeTaskTitleAC =
    (id: string, title: string, todolistId: string): ChangeTaskTitleAT => {
        return {type: 'CHANGE-TASK-TITLE', title: title, todolistId: todolistId, id: id}
    }
