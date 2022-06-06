import React, {ChangeEvent, useCallback} from 'react';
import {Checkbox, IconButton} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import {EditableSpan} from './EditableSpan';
import ClearIcon from '@mui/icons-material/Clear';

export type TaskPropsType = {
    todolistId: string
    taskId: string
    taskTitle: string
    isDone: boolean
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void

}

export const Task = React.memo((props: TaskPropsType) => {

    const onClickHandler = useCallback(() => {
        props.removeTask(props.taskId, props.todolistId)}, [props])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        props.changeTaskStatus(props.taskId, newIsDoneValue, props.todolistId)
    }, [props])

    const onTitleChangeHandler = useCallback((newValue: string) =>{
        props.changeTaskTitle(props.taskId, newValue, props.todolistId)}, [props])

    return <div key={props.taskId} className={props.isDone ? 'is-done' : ''}>

        <Checkbox
            onChange={onChangeHandler}
            checked={props.isDone}
            size="small"
            icon={<BookmarkBorderIcon/>}
            checkedIcon={<BookmarkIcon/>}
        />

        <EditableSpan value={props.taskTitle} onChange={onTitleChangeHandler}/>

        <IconButton onClick={onClickHandler} aria-label="delete" size="small">
            <ClearIcon fontSize="inherit"/>
        </IconButton>

    </div>
})