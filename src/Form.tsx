import React from 'react';
import { FormSFC } from './FormSFC';

type FormProps = {
    buttonTitle: string;
    onSubmit: (formState: FormState) => void;
}

type FormState = {
    inputValue: string;
}

export class Form extends React.Component<FormProps, FormState> {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        };
        this.onInputChange = this.onInputChange.bind(this);
    }

    onInputChange(event) {
        const newState = {
            inputValue: event.target.value
        };
        this.setState(newState);
        console.log(event.target.value);
    }

    render() {
        return <FormSFC
            buttonTitle={this.props.buttonTitle}
            inputValue={this.state.inputValue}
            onButtonClick={(event) => {
                this.props.onSubmit(this.state);
            }}
            onInputChange={this.onInputChange}
        />
    }
}
