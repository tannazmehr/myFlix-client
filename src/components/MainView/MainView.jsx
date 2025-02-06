import React from "react";
import { useState , useEffect } from "react";
import { MovieView } from "../MovieView/MovieView";
import { MovieCard } from "../MovieCard/MovieCard";
import { LoginView } from "../LoginView/LoginView";
import { SignupView } from "../SignupView/SignupView";
import { Row, Col, Button } from "react-bootstrap";

export function MainView() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null)
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        if (!token) return;

        fetch("https://mymoviecircle-50f243eb6efe.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => response.json())
        .then((data) => {
            const moviesFromApi = data.map((datum) => {
                return {
                    id: datum._id,
                    Title: datum.Title,
                    Description: datum.Description,
                    Director: datum.Director.Name,
                    Genre: datum.Genre.Name,
                    Image: datum.ImagePath
                   };
            });

            setMovies(moviesFromApi);
        });
    }, [token]);

    if (!user) {
        return (
            <>
                <Row className="p-5">
                    <h3>Welcome to my Movie collection</h3>
                </Row>
                <Row className="h-100">
                    <Col className="mb-5" md={5}>
                        <LoginView
                        onLoggedIn={(user, token) => {
                        setUser(user);
                        setToken(token);
                        }}
                        />
                    </Col>
                    <Col md={{span:5, offset:1}}>
                        <SignupView />
                    </Col>
                </Row>
            </>
        );
      }


    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }
    if (movies.length === 0) {
        return <div>The list is empty.</div>;
    }
    return (
        <>
            <Row>
                {movies.map((movie) => (
                  <Col className="mb-5"  md={4} key={movie.id}>
                    <MovieCard
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                    />
                </Col>   
                ))}
            </Row>
            <Row className="position-relative">    
                <Button
                    className="w-25 position-absolute bottom-0 end-0"
                    onClick={() =>{
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                    }}
                    variant="outline-secondary"
                    >Logout</Button>
            </Row>
        </>
    );
};