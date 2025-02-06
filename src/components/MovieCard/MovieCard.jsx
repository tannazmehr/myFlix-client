import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export function MovieCard({ movie, onMovieClick}) {
    return (
        <Card className="h-100">
            <Card.Img className="h-75" variant="top" src={movie.Image} />
            <Card.Body >
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Director}</Card.Text>
              <Button onClick={() => onMovieClick(movie)} variant="dark">
               Open
              </Button>
            </Card.Body>
      </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};