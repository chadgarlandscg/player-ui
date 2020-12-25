import React from 'react';
import { BaseButton } from './BaseButton';

export interface PrimaryButtonProps {
    text: string;
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    className?: string;
    disabled?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({text, onClick, className, disabled}) => {
    return <BaseButton
        className={className}
        text={text}
        onClick={onClick}
        disabled={disabled}
        variant="contained"
    />
}