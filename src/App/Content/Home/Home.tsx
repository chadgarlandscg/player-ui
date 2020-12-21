import { Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CardCarousel } from '../../../Components/Carousels/CardCarousel';

export const Home: React.FC = () => {
    const history = useHistory();
    
    const startGameCards = [{
        description: "The classic game where hard beats pointy, pointy beats flimsy, and flimsy beats hard. May the lucky survive!",
        title: "Rock, Paper, Scissors",
        onClick: () => history.push("/rock-paper-scissors")
    },{
        description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        title: "Lizard",
        onClick: () => history.push("/lizard")
    }];

    const joinGameCards = [{
        id: 1,
        description: "4/6 in Lobby",
        title: "Rock, Paper, Scissors",
        onClick: () => history.push(`/games/${1}`)
    },{
        id: 100,
        description: "2/6 in Lobby",
        title: "Rock, Paper, Scissors",
        onClick: () => history.push(`/games/${100}`)
    }];

    return (
        <div>
            <CardCarousel title="Start a Game" cards={startGameCards}/>
            <CardCarousel title="Join a Game" cards={joinGameCards}/>
        </div>
    );
}

