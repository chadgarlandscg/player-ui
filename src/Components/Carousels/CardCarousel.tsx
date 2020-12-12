import React from 'react';
import { PhotoCard } from '../Cards/PhotoCard';
import { HorizontalGrid } from '../Grids/HorizontalGrid'

export const CardCarousel: React.FC = () => {
  return (
    <HorizontalGrid>
        {[
            <PhotoCard text="Lizard" />,
            <PhotoCard text="Test" />
        ]}
    </HorizontalGrid>
  );
}
