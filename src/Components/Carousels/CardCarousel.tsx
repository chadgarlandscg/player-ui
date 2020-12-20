import React from 'react';
import { PhotoCard } from '../Cards/PhotoCard';
import { HorizontalGrid } from '../Grids/HorizontalGrid'

export const CardCarousel: React.FC = () => {
  const card = {
    description: "Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica",
    title: "Lizard"
  };

  return (
    <HorizontalGrid>
        {[
            <PhotoCard {...card}/>,
            <PhotoCard title="Test" />,
            <PhotoCard title="Next" />,
            <PhotoCard title="Next" />,
            <PhotoCard title="Next" />,
            <PhotoCard title="Next" />,
            <PhotoCard title="Next" />
        ]}
    </HorizontalGrid>
  );
}
