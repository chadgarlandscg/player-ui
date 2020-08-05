import React from 'react';

type FormSFCProps = {
    inputValue: string;
    onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onButtonClick: () => void;
    buttonTitle: string;
}

export function FormSFC(props: FormSFCProps) {
    return (
        <div>
            <input value={props.inputValue} onChange={props.onInputChange}/>
            <button onClick={props.onButtonClick}>{props.buttonTitle || "Test!"}</button>
        </div>
    );
}
