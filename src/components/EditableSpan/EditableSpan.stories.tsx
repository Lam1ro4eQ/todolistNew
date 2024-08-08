import type {Meta, StoryObj} from '@storybook/react';
import React from "react";

import {EditableSpan} from "./EditableSpan";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof EditableSpan> = {
    title: 'Todolists/EditableSpan',
    component: EditableSpan,
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        value: {
            description: 'Start value empty. Add value push button set string.',
            action: 'clicked'
        },
        onChange: {
            description: 'Value EditableSpan changed',
            action: 'Value EditableSpan changed'
        }
    },
    args : {
        value: '11]1'
    }

};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const EditableSpanStory: Story = {};




