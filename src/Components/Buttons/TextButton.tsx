import React from 'react';
import { BaseButton } from './BaseButton';

export interface TextButtonProps {
    text: string;
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
}

export const TextButton: React.FC<TextButtonProps> = ({text, onClick}) => <BaseButton text={text} onClick={onClick} variant="text"/>