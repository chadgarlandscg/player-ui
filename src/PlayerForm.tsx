import React from 'react';
import { Form } from './Form';

import * as playerApi from './playerApi'

export class PlayerForm extends React.Component {
    render() {
        return (
            <Form
                withValidation={true}
                labelTitle="Name"
                buttonTitle="Join Game"
                onSubmit={formState => playerApi.addPlayer(formState.inputValue)}
            />
        );
    }
}
