import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { TextInput } from '../Inputs/TextInput';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

interface FormProps {
    inputFields: string[];
}

export const Form: React.FC<FormProps> = ({inputFields}) => {
    const classes = useStyles();
    return (
        <form className={classes.root} noValidate autoComplete="off">
            {inputFields.map((inputField, i) => <TextInput key={i} label={inputField} />)}
        </form>
    );
}