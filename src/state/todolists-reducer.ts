import {FilterValuesType, TodolistType} from '../App';
import {v1} from 'uuid';

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string,
    title: string
}
export type ChangeTodolistFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string,
    filter: FilterValuesType
}

type ActionType =
    RemoveTodolistAT |
    AddTodolistAT |
    ChangeTodolistTitleActionType |
    ChangeTodolistFilterAT

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            let newTodolist: TodolistType = {id: action.todolistId, title: action.title, filter: 'all'};
            return ([...state, newTodolist]);
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.title = action.title;
            }
            return ([...state]);
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                todolist.filter = action.filter;
            }
            return ([...state])
        }
        default:
            throw new Error('I don\'t understand this type')
    }
}

export const RemoveTodolistAC = (todolistId: string): RemoveTodolistAT => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodolistAC = (title: string): AddTodolistAT => {
    return {type: 'ADD-TODOLIST', title: title, todolistId: v1()}
}
export const ChangeTodolistTitleAC = (todolistId: string, newNitle: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: newNitle}
}
export const ChangeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType): ChangeTodolistFilterAT => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: newFilter}
}