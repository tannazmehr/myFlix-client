import React from "react";
import PropTypes from "prop-types";

export function MovieCard({ movie, onMovieClick}) {
    return (
        <div 
        onClick={() =>{
            onMovieClick(movie);
        }}
        >{movie.Title}</div>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};