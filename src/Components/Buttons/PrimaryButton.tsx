import React from 'react';
import { BaseButton } from './BaseButton';

export interface PrimaryButtonProps {
    text: string;
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({text, onClick, className}) => <BaseButton className={className} text={text} onClick={onClick} variant="contained"/>