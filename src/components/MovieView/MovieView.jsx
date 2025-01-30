import React from "react";
export function MovieView({ movie, onBackClick }) {
    return (
        <div>
            <button onClick={onBackClick}>BACK</button>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>

            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre}</span>
            </div>
        </div>
    );
}