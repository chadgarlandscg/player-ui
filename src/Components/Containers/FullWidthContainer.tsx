import { Container } from '@material-ui/core';
import React, { ReactNode } from 'react';

interface FullWidthContainerProps {
}

export const FullWidthContainer: React.FC<FullWidthContainerProps> = ({children}) => {
    return (
        <Container>
            {children}
        </Container>
    );
}
