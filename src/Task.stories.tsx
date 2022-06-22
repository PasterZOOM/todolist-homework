import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Task} from './Task';

export default {
    title: 'Todolist/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const removeTask = action('I want to delete a task')
const changeTaskTitle = action('I want to change the title of the task')
const changeTaskStatus = action('I want to change the task status')

const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />

export const TaskIsDoneExample = Template.bind({})
TaskIsDoneExample.args = {
    isDone: true,
    removeTask: removeTask,
    taskTitle: 'React',
    changeTaskTitle: changeTaskTitle,
    changeTaskStatus: changeTaskStatus
}

export const TaskIsNotDoneExample = Template.bind({})
TaskIsNotDoneExample.args = {
    isDone: false,
    removeTask: removeTask,
    taskTitle: 'React',
    changeTaskTitle: changeTaskTitle,
    changeTaskStatus: changeTaskStatus
}
