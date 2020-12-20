import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

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

export const HorizontalGrid: React.FC<{children: React.ReactNodeArray}> = ({children}) => {
  const classes = useStyles();

  return (
    <div className={classes.scrollContainer}>
      <div className={classes.rootContainer}>
            {children.map((child, i) => (
                <>{child}</>
            ))}
      </div>
    </div>
  );

}
