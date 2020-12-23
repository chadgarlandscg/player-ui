import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TextInput } from '../Inputs/TextInput';
import { MarkedSlider, MarkedSliderProps } from '../Inputs/MarkedSlider';
import { PrimaryButton } from '../Buttons/PrimaryButton';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                margin: theme.spacing(1),
                width: '25ch',
            },
        },
    }),
);

interface FormProps {
    inputFields?: string[];
    sliders?: MarkedSliderProps[];
    submitText: string;
    onSubmit: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export const Form: React.FC<FormProps> = ({inputFields, sliders, submitText, onSubmit}) => {
    const classes = useStyles();
    return (
        <form className={classes.root} noValidate autoComplete="off">
            {inputFields.map((inputField, i) => <TextInput key={i} label={inputField} />)}
            {sliders.map((slider, i) => <MarkedSlider key={i} {...slider} />)}
            <PrimaryButton text={submitText} onClick={onSubmit}/>
        </form>
    );
}