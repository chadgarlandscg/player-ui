import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 'none',
    },
    rootContainer: {
      width: 'max-content',
    },
    scrollContainer: {
      overflowX: 'scroll',
    },
    card: {
      height: 140,
      width: 100,
    },
  }),
);

export const Carousel: React.FC<{children: React.ReactNodeArray}> = ({children}) => {
  const classes = useStyles();

  return (
    <Box className={classes.scrollContainer}>
      <Box className={classes.rootContainer}>
        {children}
      </Box>
    </Box>
  );
}
