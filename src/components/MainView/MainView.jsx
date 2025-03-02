import React from "react";
import { useState , useEffect } from "react";
import { MovieView } from "../MovieView/MovieView";
import { MovieCard } from "../MovieCard/MovieCard";
import { LoginView } from "../LoginView/LoginView";
import { SignupView } from "../SignupView/SignupView";
import { ProfileView } from "../ProfileView/ProfileView";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { Row, Col, Form } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export function MainView() {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken : null)
    const [movies, setMovies] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");

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

    const filteredMovies = movies.filter(movie =>
      movie.Title.toLowerCase().includes(search.toLowerCase())
  );

    return (
        <BrowserRouter>
            <NavigationBar 
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Row className="justify-content-md-center">
                {user && (
                    <Col md={6} className="mb-3">
                      <Form
                        onSubmit={(e) => e.preventDefault()}
                        className="d-flex"
                      >
                        <Form.Control
                            type="text"
                            placeholder="Search movies..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="me-2"
                        />
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={() => setSearch(searchInput)}
                        >Search</button>
                      </Form>
                    </Col>
                )}
            </Row>
          <Row className="justify-content-md-center">
            <Routes>
              <Route
                path="/signup"
                element={
                  <>
                    {user ? (
                      <Navigate to="/" />
                    ) : (
                      <Col md={5}>
                        <SignupView />
                      </Col>
                    )}
                  </>
                }
              />

            <Route
                path="/login"
                element={
                  <>
                    {user ? (
                        <Navigate to="/" />
                     ) : (
                        <Col md={5}>
                            <LoginView onLoggedIn={(user) => setUser(user)} />
                        </Col>
                    )}
              </>
            }
          />

              <Route
                path="/movies/:movieId"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : filteredMovies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <Col md={8}>
                        <MovieView movies={movies} user={user} token={token} setUser={setUser}/>
                      </Col>
                    )}
                  </>
                }
              />

              <Route
                path="/"
                element={
                  <>
                    {!user ? (
                      <Navigate to="/login" replace />
                    ) : filteredMovies.length === 0 ? (
                      <Col>No movie found!</Col>
                    ) : (
                      <>
                        {filteredMovies.map((movie) => (
                          <Col className="mb-4" key={movie.id} md={3}>
                            <MovieCard movie={movie} />
                          </Col>
                        ))}
                      </>
                    )}
                  </>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProfileView
                    user={user}
                    movies={movies}
                    token={token}
                    handleUserUpdate={(updatedUser) => {
                      setUser(updatedUser);
                      localStorage.setItem("user", JSON.stringify(updatedUser));
                    }}
                    onDeregister={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
                  />
                }
              />
            </Routes>
          </Row>
        </BrowserRouter>
      );
    }    