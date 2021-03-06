import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {RequestStatusType, setAppStatusAC} from 'app/app-reducer'
import {todolistsAPI, TodolistType} from 'api/todolists-api'
import {fetchTasksTC} from 'features/TodolistsList/tasks-reducer'
import {logoutTC} from 'features/Login/auth-reducer'

export const fetchTodolistsTC = createAsyncThunk('todolists/fetchTodolists', async (params, {dispatch}) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  const res = await todolistsAPI.getTodolists()
  dispatch(setAppStatusAC({status: 'succeeded'}))
  res.data.forEach(tl => {
    dispatch(fetchTasksTC(tl.id))
  })
  return {todolists: res.data}
})
export const removeTodolistTC = createAsyncThunk('todolists/removeTodolist', async (todolistId: string, {dispatch}) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  dispatch(changeTodolistEntityStatusAC({id: todolistId, status: 'loading'}))
  await todolistsAPI.deleteTodolist(todolistId)
  dispatch(setAppStatusAC({status: 'succeeded'}))
  return {id: todolistId}
})
export const addTodolistTC = createAsyncThunk('todolists/addTodolistTC', async (title: string, {dispatch}) => {
  dispatch(setAppStatusAC({status: 'loading'}))
  const res = await todolistsAPI.createTodolist(title)
  dispatch(setAppStatusAC({status: 'succeeded'}))
  return {todolist: res.data.data.item}
})
export const changeTodolistTitleTC = createAsyncThunk('todolists/changeTodolistTitleTC', async (param: { id: string, title: string }) => {
  await todolistsAPI.updateTodolist(param.id, param.title)
  return param
})


const slice = createSlice({
  name: 'todolists',
  initialState: [] as Array<TodolistDomainType>,
  reducers: {
    changeTodolistFilterAC(state, action: PayloadAction<{ id: string, filter: FilterValuesType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      state[index].filter = action.payload.filter
    },
    changeTodolistEntityStatusAC(state, action: PayloadAction<{ id: string, status: RequestStatusType }>) {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      state[index].entityStatus = action.payload.status
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodolistsTC.fulfilled, (state, action) => {
      return action.payload.todolists.map(tl => ({
        ...tl,
        filter: 'all',
        entityStatus: 'idle'
      }))
    })
    builder.addCase(removeTodolistTC.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      if (index > -1) state.splice(index, 1)
    })
    builder.addCase(addTodolistTC.fulfilled, (state, action) => {
      state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
    })
    builder.addCase(changeTodolistTitleTC.fulfilled, (state, action) => {
      const index = state.findIndex(tl => tl.id === action.payload.id)
      state[index].title = action.payload.title
    })
    builder.addCase(logoutTC.fulfilled, () => [])
  }
})

export const todolistsReducer = slice.reducer
export const {
  changeTodolistFilterAC,
  changeTodolistEntityStatusAC
} = slice.actions

// types
export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
  entityStatus: RequestStatusType
}