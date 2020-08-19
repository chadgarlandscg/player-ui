import React from 'react';
export type ListProps = {
    values: string[];
}
export function List(props: ListProps) {
    var listElements = props.values.map((v, i) => <ListElement key={i} value={v}/>);
    return (
        <div>
            {listElements}
        </div>
    );
}

type ListElementProps = {
    value: string;
}

function ListElement(props: ListElementProps) {
    return (
        <p>
            {props.value}
        </p>
    )
}