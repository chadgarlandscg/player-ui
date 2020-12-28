import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import { amber, cyan, green } from '@material-ui/core/colors';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Content } from './Content/Content';
import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { Provider } from 'react-redux'
import store from '../Redux/Store';

export const App: React.FC = () => {
    const theme = createMuiTheme({
        palette: {
            primary: green,
            secondary: amber,
        }
    });
    return (
        <BrowserRouter>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <Header />
                    <Content />
                    <Footer />
                </ThemeProvider>
            </Provider>
        </BrowserRouter>
    );
}

