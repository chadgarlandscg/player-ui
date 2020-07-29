import React from 'react';

export function FormSFC(props) {
    return (
        <div>
            <input value={props.inputValue} onChange={props.onInputChange}/>
            <button onClick={props.onButtonClick}>{props.buttonTitle || "Test!"}</button>
        </div>
    );
}
