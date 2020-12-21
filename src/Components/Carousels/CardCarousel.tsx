import { Typography } from '@material-ui/core';
import React from 'react';
import { PhotoCard, PhotoCardProps } from '../Cards/PhotoCard';
import { Carousel } from './Carousel'

interface CardCarouselProps {
  title: string;
  cards: PhotoCardProps[]
}

export const CardCarousel: React.FC<CardCarouselProps> = ({title, cards}) => {
  return (
    <>
      <Typography gutterBottom variant="h4" component="h2">
          {title}
      </Typography>
      <Carousel>
          {cards.map((card, i) => <PhotoCard key={i} {...card}/>)}
      </Carousel>
    </>
  );
}
