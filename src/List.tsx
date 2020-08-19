import React from 'react';

export type ListProps = {
    values: string[];
    onElementClicked?: (index: number) => void;
}
export function List(props: ListProps) {
    var listElements = props.values.map((value, index) => {
        return (
            <ListElement
                key={index}
                value={value}
                onClick={(event) => {
                    props.onElementClicked(index);
                }}
            />
        )
    });
    return (
        <div>
            {listElements}
        </div>
    );
}

type ListElementProps = {
    value: string;
    onClick: (event: React.MouseEvent<HTMLParagraphElement>) => void;
}

function ListElement(props: ListElementProps) {
    return (
        <p onClick={props.onClick}>
            {props.value}
        </p>
    )
}