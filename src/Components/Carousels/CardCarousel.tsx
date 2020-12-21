import React from 'react';
import { PhotoCard } from '../Cards/PhotoCard';
import { Carousel } from './Carousel'

export const CardCarousel: React.FC = () => {
  const card = {
    description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    title: "Lizard"
  };

  return (
    <Carousel>
        {[
            <PhotoCard {...card}/>,
            <PhotoCard title="Test" />,
            <PhotoCard title="Next" />,
            <PhotoCard title="Next" />,
            <PhotoCard title="Next" />,
            <PhotoCard title="Next" />,
            <PhotoCard title="Next" />
        ]}
    </Carousel>
  );
}
