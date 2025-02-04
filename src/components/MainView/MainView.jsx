import React from "react";
import { useState , useEffect } from "react";
import { MovieView } from "../MovieView/MovieView";
import { MovieCard } from "../MovieCard/MovieCard";

export function MainView() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://mymoviecircle-50f243eb6efe.herokuapp.com/movies")
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((datum) => {
               return {
                id: datum._id,
                Title: datum.Title,
                Description: datum.Description,
                Director: datum.Director.Name,
                Genre: datum.Genre.Name
               };
            });

            setMovies(moviesFromApi);
        });
    }, []);


    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }
    if (movies.length === 0) {
        return <div>The list id empty.</div>;
    }
    return (
        <div>
            {movies.map((movie) => (
             <MovieCard
               key={movie.id}
               movie={movie}
               onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
               }}
             />   
            ))}
        </div>
    );
}