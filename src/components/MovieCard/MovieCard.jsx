import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, showRemoveButton, onRemove }) => {
    return (
        <Card className="h-100">
            <Card.Img className="h-75" variant="top" src={movie.Image} />
            <Card.Body >
              <Card.Title>{movie.Title}</Card.Title>
              <Card.Text>{movie.Director}</Card.Text>
              <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
                <Button variant="link">Open</Button>
              </Link>
              {showRemoveButton && (
                <Button
                  variant="outline-danger"
                  size="sm"
                  className=" remove-favorites-btn mt-2 "
                  onClick={() => onRemove(movie.id)}
                >Remove from Favorites</Button>
              )}
            </Card.Body>
      </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired
};