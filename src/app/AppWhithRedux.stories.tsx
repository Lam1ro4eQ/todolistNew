import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {Button} from '../stories/Button';
import {AddItemForm, AddItemFormPropsType} from "../components/AddItemForm/AddItemForm";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from "@mui/material/TextField/TextField";
import {IconButton} from "@mui/material";
import {AddBox} from "@mui/icons-material";
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {ReduxStoreProviderDecorator} from "../state/decorators/ReduxStoreProviderDecorator";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof AppWithRedux> = {
    title: 'Todolists/AppWithRedux',
    component: AppWithRedux,

    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof AppWithRedux>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const AppWithReduxStory: Story = {};