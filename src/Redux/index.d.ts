import { Action, ThunkAction } from '@reduxjs/toolkit';
import 'react-redux';

import { RootState } from './Store'

declare module 'react-redux' {
    interface DefaultRootState extends RootState { }
}

declare global {
    type AppThunk<ReturnType = void> = ThunkAction<
        ReturnType,
        RootState,
        unknown,
        Action<string>
    >
}