import React, { ReactNode } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Title } from '../Labels/Title';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        margin: 'auto'
    },
}));

interface FixedHeaderContainerProps {
    title: string;
}

export const FixedHeader: React.FC<FixedHeaderContainerProps> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Title text={props.title} className={classes.title}/>
                </Toolbar>
            </AppBar>
        </div>
    );
}