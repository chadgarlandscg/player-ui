import React from 'react';
import { BaseButton } from './BaseButton';

export interface PrimaryButtonProps {
    text: string;
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({text, onClick}) => <BaseButton text={text} onClick={onClick} variant="contained"/>