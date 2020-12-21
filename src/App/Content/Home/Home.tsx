import React from 'react';
import { CardCarousel } from '../../../Components/Carousels/CardCarousel';

export const Home: React.FC = () => {
    const card = {
        description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
        title: "Lizard"
    };
    return (
        <CardCarousel cards={[card]}/>
    );
}

