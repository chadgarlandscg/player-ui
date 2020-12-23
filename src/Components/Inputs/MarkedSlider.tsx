import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

export interface MarkedSliderProps {
  title: string;
  min: number;
  max: number;
  step?: number;
  init?: number;
  marks?: Mark[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 300,
    },
    margin: {
      height: theme.spacing(3),
    },
  }),
);

export const MarkedSlider: React.FC<MarkedSliderProps> = ({title, min, max, step = 1, init, marks}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography gutterBottom>
        {title}
      </Typography>
      <Slider
        defaultValue={init || min}
        valueLabelDisplay="auto"
        step={step}
        min={min}
        max={max}
        marks={marks || toSimpleMarks(min, max)}
      />
    </div>
  );
}

type Mark = {value: number, label: number};

function toStepSize(min: number, max: number, steps: number): number {
  return (max-min)/steps;
} 

function toMidpoint(min: number, max: number) {
  return min + ((max - min)/2)
}

function toSimpleMarks(min: number, max: number): Mark[] {
  const midpoint = toMidpoint(min, max);
  return [
      {value: min, label: min},
      {value: midpoint, label: midpoint},
      {value: max, label: max},
  ];
}

function toMarks(min: number, max: number, steps: number): Mark[] {
  let stepsRemaining = steps;
  const stepSize = toStepSize(min, max, steps);
  const marks: Mark[] = [{value: min, label: min}];
  let last = min;
  while (stepsRemaining) {
    const current = last + stepSize;
    marks.push({value: current, label: current})
    last = current;
    stepsRemaining--;
  }
  marks.push({value: max, label: max});

  return marks;
}