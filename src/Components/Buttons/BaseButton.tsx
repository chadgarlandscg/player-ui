import React from 'react';
import { Button } from '@material-ui/core';

export interface BaseButtonProps {
    text?: string;
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    variant: "text" | "contained" | "outlined";
    className?: string;
    disabled?: boolean;
}

export const BaseButton: React.FC<BaseButtonProps> = ({variant, text, onClick, children, className, disabled}) => {
    return (
      <Button
        className={className}
        variant={variant}
        size="small"
        color="primary"
        onClick={onClick}
        disabled={disabled}
      >
        {text || children}
      </Button>
    )
}