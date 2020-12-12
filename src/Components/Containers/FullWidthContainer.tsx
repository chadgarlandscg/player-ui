import { Container } from '@material-ui/core';
import React, { ReactNode } from 'react';

interface FullWidthContainerProps {
    children: ReactNode;
}

export const FullWidthContainer: React.FC = ({children}) => {
    return (
        <Container maxWidth="sm">
            {children}
        </Container>
    );
}
