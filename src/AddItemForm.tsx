import {IconButton, TextField} from '@mui/material'
import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import AddIcon from '@mui/icons-material/Add'

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    console.log('AddItemForm called')
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const addItem = () => {
        if (title.trim() !== '') {
            props.addItem(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }

        if (e.key === 'Enter') {
            addItem()
        }
    }

    return <div>
        <TextField
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            id={error ? 'outlined-error-helper-text' : 'outlined-basic'}
            label="Enter your text"
            variant="outlined"
            error={!!error}
            helperText={error && 'Incorrect entry.'}
            size={'small'}
        />
        <IconButton onClick={addItem} aria-label="delete" size="medium">
            <AddIcon/>
        </IconButton>

        {/*{error && <div className="error-message">{error}</div>}*/}
    </div>
})
