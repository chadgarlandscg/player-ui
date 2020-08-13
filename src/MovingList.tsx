import { List } from "./List";
import React from "react";

type MovingListState = {
    first: string[];
    second: string[];
}

export class MovingList extends React.Component<{}, MovingListState> {
    constructor(props) {
        super(props);
        this.state = {
            first: ["Sebas", "Serge", "Chad"],
            second: ["Obed", "Test"]
        }
    }

    render() {
        return (
            <div>
                <div>
                    <List onElementClicked={(index) => {
                        const movedValue = this.state.first[index];
                        const newFirstArray = this.state.first.filter((v, i) => i !== index);
                        const newSecondArray = [...this.state.second, movedValue];
                        this.setState({
                            first: newFirstArray,
                            second: newSecondArray
                        });
                    }} values={this.state.first}/>
                    <List onElementClicked={(index) => {
                        const movedValue = this.state.second[index];
                        const newSecondArray = this.state.second.filter((v, i) => i !== index);
                        const newFirstArray = [...this.state.first, movedValue];
                        this.setState({
                            first: newFirstArray,
                            second: newSecondArray
                        });
                    }} values={this.state.second}/>
                </div>

                <button onClick={() => {
                    await axios.post("http://localhost:9999/players/3/potions", this.state.second);
                    changeScreens("/battleground");

                }}>Check out</button>

            </div>
        
        )
    }
}
