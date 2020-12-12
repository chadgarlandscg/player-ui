import React from 'react';
import { Route } from 'react-router-dom';
import { Home } from '../Home/Home';

export const HomeRoute: React.FC = () => {
    return (
        <Route path="/">
            <Home />
        </Route>
    );
}

