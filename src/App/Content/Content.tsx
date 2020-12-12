import { Container } from '@material-ui/core';
import React from 'react';
import { FullWidthContainer } from '../../Components/Containers/FullWidthContainer';
import { Routes } from './Routes/Routes';

export const Content: React.FC = () => {
    return (
        <FullWidthContainer>
            <Routes />
        </FullWidthContainer>
    );
}
