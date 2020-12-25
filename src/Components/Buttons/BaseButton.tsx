import React from 'react';
import { Button } from '@material-ui/core';

export interface BaseButtonProps {
    text?: string;
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    variant: "text" | "contained" | "outlined";
    className?: string;
}

export const BaseButton: React.FC<BaseButtonProps> = ({variant, text, onClick, children, className}) => {
    return (
      <Button className={className} variant={variant} size="small" color="primary" onClick={onClick}>
        {text || children}
      </Button>
    )
}