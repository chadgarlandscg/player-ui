import React, { useState } from 'react';

type FormProps = {
    labelTitle: string;
    buttonTitle: string;
    withValidation?: boolean;
    onSubmit: (state: FormState) => void;
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
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const newState = {
            inputValue: event.target.value
        };
        this.setState(newState);
        console.log(event.target.value);
    }

    onButtonClick(event: React.MouseEvent<HTMLButtonElement>) {
        this.props.onSubmit(this.state);
    }

    render() {
        const isInvalid = this.props.withValidation && !this.state.inputValue;
        return (
            <div>
                <LabelInputPair
                    onChange={this.onInputChange}
                    value={this.state.inputValue}
                    title={this.props.labelTitle}
                    withValidation={this.props.withValidation}                   
                />
                <button
                    disabled={isInvalid}
                    onClick={this.onButtonClick}>{this.props.buttonTitle || "Test!"}
                </button>
            </div>
        );
    }
}

interface LabelInputPairProps {
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
    title: string;
    withValidation: boolean;
    value: string;
}

function LabelInputPair(props: LabelInputPairProps) {
    const [touched, setTouched] = useState(false);
    const isInvalid = props.withValidation && touched && !props.value;
    return (
        <div>
            <label>
                {props.title}
            </label>
            <input 
                style={isInvalid ? {borderColor: 'red'} : null} 
                value={props.value} 
                onChange={e => {
                    setTouched(true);
                    props.onChange(e);
                }}
            />
        </div>
    )
}