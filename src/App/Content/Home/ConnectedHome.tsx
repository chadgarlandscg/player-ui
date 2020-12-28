import { connect } from 'react-redux'
import { fetchGameTypes, homeActionCreators } from './HomeSlice'
import { ConnectedProps } from 'react-redux'
import { Home } from './Home';

const connector = connect(state => ({
    gameTypes: state.home.gameTypes,
    loading: state.home.loadingGameTypes,
}), {fetchGameTypes});

export type ConnectedHomeProps = ConnectedProps<typeof connector>

export const ConnectedHome = connector(Home);