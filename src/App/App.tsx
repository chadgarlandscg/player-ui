import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { amber, cyan } from '@material-ui/core/colors';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Content } from './Content/Content';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';

export const App: React.FC = () => {
    const theme = createMuiTheme({
        palette: {
            primary: cyan,
            secondary: amber
        }
    });
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <Header />
                <Content />
                <Footer />
            </ThemeProvider>
        </BrowserRouter>
    );
}

