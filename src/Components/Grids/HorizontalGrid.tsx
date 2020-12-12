import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
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
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={10}>
          {children.map((child, i) => (
            <Grid key={i} item>
              {child}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
