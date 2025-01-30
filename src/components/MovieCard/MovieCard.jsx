import React from "react";
export function MovieCard({ movie, onMovieClick}) {
    return (
        <div 
        onClick={() =>{
            onMovieClick(movie);
        }}
        >{movie.Title}</div>
    );
}