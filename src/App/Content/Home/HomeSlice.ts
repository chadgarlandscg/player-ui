import { createSlice, PayloadAction, SliceCaseReducers, ThunkAction } from '@reduxjs/toolkit';
import { GameSDK, GameType } from '../../../SDKs/Games/GameSDK';

export interface HomeState {
    gameTypes: GameType[];
    gameTypesLoadingError: string;
    loadingGameTypes: boolean;
}

const initialState: HomeState = {
    gameTypes: [],
    loadingGameTypes: false,
    gameTypesLoadingError: null
};

export const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        fetchGameTypesSuccessful: (state, action: PayloadAction<GameType[]>) => {
            state.loadingGameTypes = false;
            state.gameTypes = action.payload;
        },
        fetchingGameTypes: state => {
            state.loadingGameTypes = true;
        },
        fetchGameTypesFailed: (state, action: PayloadAction<string>) => {
            state.gameTypesLoadingError = action.payload;
            state.loadingGameTypes = false;
        },
    },
});

export const homeActionCreators = homeSlice.actions;

export const fetchGameTypes = (): AppThunk => async dispatch => {
    const sdk = new GameSDK();
    dispatch(homeActionCreators.fetchingGameTypes());
    try {
        const gameTypes = await sdk.getGameTypes();
        dispatch(homeActionCreators.fetchGameTypesSuccessful(gameTypes));
    } catch(error) {
        dispatch(homeActionCreators.fetchGameTypesFailed());
    }
};

export default homeSlice.reducer;