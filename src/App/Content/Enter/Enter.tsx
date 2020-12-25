import { Container, createStyles, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CardCarousel } from '../../../Components/Carousels/CardCarousel';
import { Form } from '../../../Components/Forms/Form';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(5),
                width: '25ch',
            },
        },
    }),
);

export const Enter: React.FC = () => {
    const history = useHistory();
    return (
        <Form
            title="Welcome, Traveler!"
            inputFields={["Username/Email"]}
            submitText={"Let's Go!"}
            onSubmit={() => history.push('/home')}
        />
    );
}