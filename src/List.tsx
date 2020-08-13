import React from 'react';

export type ListProps = {
    values: string[];
    onElementClicked: (index: number) => void;
}
export function List(props: ListProps) {
    const fromValueToListElement = (v: string, i: number) => {
        return (
            <ListElement
                value={v}
                onClick={(event) => {
                    props.onElementClicked(i);
                }}
            />
        )
    }

    var listElements = props.values.map(fromValueToListElement);
    return (
        <div>
            {listElements}
        </div>
    );
}

type ListElementProps = {
    value: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function ListElement(props: ListElementProps) {
    return (
        <button onClick={props.onClick}>
            {props.value}
        </button>
    )
}