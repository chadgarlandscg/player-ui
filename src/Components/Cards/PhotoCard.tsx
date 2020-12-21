import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link, useHistory, useLocation } from 'react-router-dom';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';

const useStyles = makeStyles({
  root: {
    maxWidth: 300,
    height: 200,
    display: 'inline-block',
    margin: '10px'
  },
  media: {
    height: 100,
  },
});

export interface PhotoCardProps {
    image?: string;
    title: string;
    description?: string;
    isPriority?: boolean;
    onClick?: (event: React.SyntheticEvent) => void;
}

export const PhotoCard: React.FC<PhotoCardProps> = ({image, title, description, isPriority, onClick}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={onClick}>
      {isPriority && <PriorityHighIcon color="secondary"/>}
      <CardActionArea>
        {image && <CardMedia
          className={classes.media}
          image={image}
        />}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          <Link to="/test">Test</Link>
        </Button>
        <Button size="small" color="primary">
          Customize
        </Button>
      </CardActions>
    </Card>
  );
}
