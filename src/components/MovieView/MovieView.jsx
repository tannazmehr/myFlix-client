import React from "react";

import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./MovieView.scss";

export const MovieView = ({ movies, user, token, setUser }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

    const updateFavorites = (movieId, action) => {
        fetch(`https://mymoviecircle-50f243eb6efe.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
            method: action === "add" ? "POST" : "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            if (!response.ok) throw new Error(`Failed to ${action} movie to favorites`);
            return response.json();
        })
        .then(data => {
            setUser(data);
            localStorage.setItem("user", JSON.stringify(data));
        })
        .catch(error => console.error(`Error ${action}ing movie to favorites`, error));
    };
    
    return (
        <div>
            <Button
                className="add-to-favorites-btn"
                variant="link"
                onClick={() =>
                updateFavorites(movie.id, user.FavoriteMovies.includes(movie.id) ? "remove" : "add")
                }
            >
                {user.FavoriteMovies.includes(movie.id) ? "Remove" : "Add"}
            </Button>

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
            <Link to={`/`}>
                <button className="back-button">BACK</button>
            </Link>
        </div>
    );
};