import React from 'react';
import Typography from '@material-ui/core/Typography';

interface SubTitleProps extends ClassNamed {
    text: string;
}

export const SubTitle: React.FC<SubTitleProps> = (props) => {
    return  (
        <Typography variant="h2" align="center" className={props.className}>
            {props.text}
        </Typography>
    );
}