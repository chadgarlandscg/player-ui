import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface TextInputProps {
    label: string;
}

export const TextInput: React.FC<TextInputProps> = ({label}) => {
    return (
        <TextField label={label} variant="outlined" />
    );
}