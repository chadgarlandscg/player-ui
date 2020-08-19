import React from 'react';
import { FormSFC } from './FormSFC';
import { Form } from './Form';
import * as playerApi from './playerApi'

export class PlayerForm extends React.Component {
    render() {
        return <Form
            buttonTitle="Join Game"
            onSubmit={(formState) => {
                console.log(formState);
                const playerName = formState.inputValue;
                playerApi.addPlayer(playerName);
            }}
        />
    }
}
