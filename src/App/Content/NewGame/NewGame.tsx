import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Form } from '../../../Components/Forms/Form';
import { Grid } from '@material-ui/core';

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
    const formProps = {
        inputFields: ["Lobby Name"],
        sliders: [
            {title: "Max Players", min: 2, max: 6, init: 4},
            {title: "Max Rounds", min: 1, max: 5, init: 3},
        ],
        submitText: "Create Game",
        onSubmit: console.log
    };
    const newGameForm = <Form {...formProps}/>
    return (
        <Grid container justify={'center'}>
            <Grid item lg={4}>
                {newGameForm}
            </Grid>
        </Grid>
            
    
    );
}