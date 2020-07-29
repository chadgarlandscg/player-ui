import React from 'react';
export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        };
        this.onInputChange = this.onInputChange.bind(this);
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    onInputChange(event) {
        const newState = {
            inputValue: event.target.value
        };
        this.setState(newState);
        console.log(event.target.value);
    }

    onButtonClick() {
        console.log(this.state);
    }

    render() {
        return (
            <div>
                <input value={this.state.inputValue} onChange={this.onInputChange}/>
                <button onClick={this.onButtonClick}>{this.props.buttonTitle || "Test!"}</button>
            </div>
        );
    }
}
