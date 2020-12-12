import React, { useState } from 'react';

type FormSFCProps = {
    inputValue: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onButtonClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    buttonTitle: string;
}

export function FormSFC(props: FormSFCProps) {
    return (
        <div>
            <FormInput onInputChange={props.onInputChange} inputValue={props.inputValue} altValidationColor="green"/>
            <button disabled={!props.inputValue} onClick={props.onButtonClick}>{props.buttonTitle || "Test!"}</button>
        </div>
    );
}

type FormInputProps = {
    inputValue: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    altValidationColor?: string;
}

function FormInput(props: FormInputProps) {
    const [touched, setTouched] = useState(false);
    const isInvalid = touched && !props.inputValue;
    return <input
        style={isInvalid ? {borderColor: props.altValidationColor || 'red'} : null}
        value={props.inputValue}
        onChange={(event) => {
            setTouched(true);
            props.onInputChange(event);
        }
    }/>
}