import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextInput } from '../Inputs/TextInput';
import { MarkedSlider, MarkedSliderProps } from '../Inputs/MarkedSlider';
import { PrimaryButton } from '../Buttons/PrimaryButton';
import { Divider, Grid } from '@material-ui/core';
import { SubTitle } from '../Labels/SubTitle';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            height: '50%'
        },
        gridRoot: {
            height: '100%',
            width: '50%',
            margin: 'auto'
        },
        fullWidth: {
            width: '100%'
        },
        submit: {
            width: '80%',
            margin: 'auto'
        },
    }),
);

interface FormProps {
    title?: string;
    inputFields?: string[];
    sliders?: MarkedSliderProps[];
    submitText: string;
    onSubmit: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export const Form: React.FC<FormProps> = ({title, inputFields, sliders, submitText, onSubmit}) => {
    const classes = useStyles();
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <Grid
                    className={classes.gridRoot}
                    container
                    direction="row"
                    alignItems="stretch"
                    justify="space-between"
                >
                        {title && <Grid item xs={12}>
                            <SubTitle text={title}/>
                            <Divider/>
                        </Grid>}
                        {inputFields.map((inputField, i) => {
                            return <Grid key={i} item xs={12}>
                                <TextInput className={classes.fullWidth} label={inputField} />
                            </Grid>
                        })}
                        {sliders.map((slider, i) => {
                            return <Grid key={i} item xs={12}>
                                <MarkedSlider {...slider} />
                            </Grid>
                        })}
                        <Grid container item xs={12}>
                            <PrimaryButton className={classes.submit} text={submitText} onClick={onSubmit}/>
                        </Grid>
                </Grid>
            </form>
    );
}