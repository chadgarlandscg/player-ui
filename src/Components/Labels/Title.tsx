import React from 'react';
import Typography from '@material-ui/core/Typography';

interface TitleProps extends ClassNamed {
    text: string;
}

export const Title: React.FC<TitleProps> = (props) => {
    return  (
        <Typography variant="h1" className={props.className}>
            {props.text}
        </Typography>
    );
}