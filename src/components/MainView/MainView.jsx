import React from "react";
import { useState } from "react";
import { MovieView } from "../MovieView/MovieView";
import { MovieCard } from "../MovieCard/MovieCard";

export function MainView() {
    const [movies, setMovies] = useState([
        {   
            id: 1,
            Title: "The Shawshank Redemption",
            Description: "A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.",
            Director: "Frank Darabont",
            Genre : "Drama"
        },
          
        {
            id: 2,
            Title: "Pulp Fiction",
            Description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
            Director: "Quentin Tarantino",
            Genre : "Thriller"
        },

        {
            id: 3,
            Title: " Forrest Gump",
            Description: "The history of the United States from the 1950s to the '70s unfolds from the perspective of an Alabama man with an IQ of 75, who yearns to be reunited with his childhood sweetheart.",
            Director: "Robert Zemeckis",
            Genre: "Romance"
        },

        {
            id: 4,
            Title: "Fight Club",
            Description: "An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.",
            Director: "David Fincher",
            Genre : "Drama"
        },

        {
            id: 5,
            Title: "Inception",
            Description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
            Director: "Christopher Nolan",
            Genre: "Action"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);
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