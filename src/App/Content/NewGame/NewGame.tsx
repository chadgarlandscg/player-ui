import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Form } from '../../../Components/Forms/Form';

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

interface NewGameProps {

}

export const NewGame: React.FC<NewGameProps> = () => {
    const classes = useStyles();
    return (
        <Form inputFields={["Lobby Name"]}/>
    );
}