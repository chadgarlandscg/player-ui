import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface TextInputProps {
    label: string;
    className?: string;
}

export const TextInput: React.FC<TextInputProps> = ({label, className}) => {
    return (
        <TextField className={className} label={label} variant="outlined" />
    );
}