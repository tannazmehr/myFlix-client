import React from "react";
import { Stack, Button } from "react-bootstrap"

export function MovieView({ movie, onBackClick }) {
    return (
        <Stack className="position-relative">
            <div className="p-2 fs-3 fw-bold">
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div className="p-2">
                <img src={movie.Image} />
            </div>
            <div className="p-2">
                <span>Description: </span>
                <span>{movie.Description}</span>

            </div>
            <div className="p-2">
                <span>Director: </span>
                <span>{movie.Director}</span>
            </div>
            <div className="p-2">
                <span>Genre: </span>
                <span>{movie.Genre}</span>
            </div>
            <div className="p-4">
            <Button className="w-25 p-2 position-absolute bottom-0 end-0" variant="outline-secondary" onClick={onBackClick}>BACK</Button>
            </div>
        </Stack>
    );
}