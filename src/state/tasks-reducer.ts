import {v1} from 'uuid';
import {TasksStateType} from '../App';


type AddTaskAT = {
    type: 'ADD_TASK'
    title: string
    todolistId: string
}
type RemoveTaskAT = {
    type: 'REMOVE_TASK'
    id: string
    todolistId: string
}
type ChangeTaskStatusAT = {
    type: 'CHANGE_TASK_STATUS'
    isDone: boolean
    todolistId: string
    id: string
}
type ChangeTaskTitleAT = {
    type: 'CHANGE_TASK_TITLE'
    title: string
    todolistId: string
    id: string
}

type ActionType = RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT

export const tasksReducer = (state: TasksStateType, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE_TASK':
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.id)
            }
        case 'ADD_TASK':
            return {
                ...state,
                [action.todolistId]: [{id: v1(), title: action.title, isDone: false}, ...state[action.todolistId]]
            }
        case 'CHANGE_TASK_STATUS':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(
                    t => t.id === action.id ? {...t, isDone: action.isDone} : t)
            }
        case 'CHANGE_TASK_TITLE':
            return {
                ...state, [action.todolistId]: state[action.todolistId].map(
                    t => t.id === action.id ? {...t, title: action.title} : t)
            }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskAT => {
    return {type: 'ADD_TASK', title: title, todolistId: todolistId}
}
export const removeTaskAC = (id: string, todolistId: string): RemoveTaskAT => {
    return {type: 'REMOVE_TASK', id: id, todolistId: todolistId}
}
export const changeTaskStatusAC =
    (id: string, isDone: boolean, todolistId: string): ChangeTaskStatusAT => {
    return {type: 'CHANGE_TASK_STATUS', isDone: isDone, todolistId: todolistId, id: id}
}
export const changeTaskTitleAC =
    (id: string, title: string, todolistId: string): ChangeTaskTitleAT => {
    return {type: 'CHANGE_TASK_TITLE', title: title, todolistId: todolistId, id: id}
}