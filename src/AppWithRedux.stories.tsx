import React from 'react'
import {ComponentMeta, ComponentStory} from '@storybook/react'
import {ReduxStoreProviderDecorator} from './stories/decorators/ReduxStoreProviderDecorator'
import AppWithRedux from './AppWithRedux'

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>


const Template: ComponentStory<typeof AppWithRedux> = () => <AppWithRedux/>

export const AppWithReduxExample = Template.bind({})
