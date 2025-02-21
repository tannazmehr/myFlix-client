import React from "react";
import { useState , useEffect } from "react";
import { MovieView } from "../MovieView/MovieView";
import { MoviesList } from "../movies-list/movies-list";
import { LoginView } from "../LoginView/LoginView";
import { SignupView } from "../SignupView/SignupView";
import { ProfileView } from "../ProfileView/ProfileView";
import { NavigationBar } from "../NavigationBar/NavigationBar";
import { Row, Col } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/reducers/movies/movies";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const user = useSelector((state) => state.user);
    const [token, setToken] = useState(storedToken? storedToken : null)
    const movies = useSelector((state) => state.movies.list);
    
    const dispatch = useDispatch();

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

            dispatch(setMovies(moviesFromApi));
        });
    }, [token]);

    return (
        <BrowserRouter>
            <NavigationBar 
                onLoggedOut={() => {
                    setToken(null);
                    localStorage.clear();
                }}
            />
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
                    ) : movies.length === 0 ? (
                      <Col>The list is empty!</Col>
                    ) : (
                      <Col md={8}>
                        <MovieView user={user} token={token} setUser={setUser}/>
                      </Col>
                    )}
                  </>
                }
              />

              <Route
                path="/"
                element={
                  <>{!user ? <Navigate to="/login" replace /> : <MoviesList />}</>
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