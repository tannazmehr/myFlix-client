import React from "react";
import { useState , useEffect } from "react";
import { MovieView } from "../MovieView/MovieView";
import { MovieCard } from "../MovieCard/MovieCard";
import { LoginView } from "../LoginView/LoginView";
import { SignupView } from "../SignupView/SignupView";

export function MainView() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null);

    useEffect(() => {
        if (!token) return;

        fetch("https://mymoviecircle-50f243eb6efe.herokuapp.com/movies", {
            headers: { Authoritation: `Bearer ${token}` }
        })
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
        })
        .catch((error) => {
            console.error("Error fetching movies", error);
        })
    }, [token]);

    if (!user) {
        return (
          <>
            <LoginView
              onLoggedIn={(user, token) => {
                setUser(user);
                setToken(token);
              }}
            />
            or
            <SignupView />
          </>
        );
      }


    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }
    if (movies.length === 0) {
        return <div>The list id empty.</div>;
    }
    return (
        <>
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
            <button
                onClick={() =>{
                setUser(null);
                setToken(null);
                localStorage.clear();
                }}
                >Log out</button>
        </>
    );
};