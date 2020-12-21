import React from 'react';
import { PhotoCard, PhotoCardProps } from '../Cards/PhotoCard';
import { Carousel } from './Carousel'

interface CardCarouselProps {
  cards: PhotoCardProps[]
}

export const CardCarousel: React.FC<CardCarouselProps> = ({cards}) => {
  return (
    <Carousel>
        {cards.map((card, i) => <PhotoCard key={i} {...card}/>)}
    </Carousel>
  );
}
