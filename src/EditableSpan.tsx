import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ?
        //<input value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode}/>
        <TextField
            variant="standard"
            onBlur={activateViewMode}
            autoFocus
            value={title}
            onChange={changeTitle}
            size={'small'}
        />
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
}
