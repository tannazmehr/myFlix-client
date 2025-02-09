import React, { useState } from "react";
import { MovieCard } from "../MovieCard/MovieCard";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ProfileView = ({ user, token, movies, handleUserUpdate, onDeregister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState(
    user.Birthday ? new Date(user.Birthday).toISOString().split("T")[0] : ""
  );
  const navigate = useNavigate();

  const favoriteMoviesList =
    movies && user.FavoriteMovies
      ? movies.filter((m) => user.FavoriteMovies.includes(m.id))
      : [];

  const removeFromFavorites = (movieId) => {
    axios
      .delete(
        `https://mymoviecircle-50f243eb6efe.herokuapp.com/users/${username}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        handleUserUpdate(response.data);
      })
      .catch((error) => {
        console.error("Error removing movie from favorites", error);
      });
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const updatedUser = { username, email, birthdate };
    if (password) {
      updatedUser.Password = password;
    }

    axios
      .put(
        `https://mymoviecircle-50f243eb6efe.herokuapp.com/users/${username}`,
        updatedUser,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert("Profile updated successfully!");
        handleUserUpdate(response.data);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("Something went wrong while updating your profile.");
      });
  };

  const handleDeregister = () => {
    const confirmDeregister = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDeregister) {
      axios
        .delete(
          `https://mymoviecircle-50f243eb6efe.herokuapp.com/users/${username}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then(() => {
          alert("Account successfully deleted.");
          onDeregister();
          navigate("/login");
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
          alert("Something went wrong while deleting your account.");
        });
    }
  };
  return (
    <Container className="profile-view-container">
        <Row><h1>Hello {user.Username}</h1></Row>
      <Row className="justify-content-center mx-auto">
        <Col xs={12} md={8} lg={6}>
          <Form className="profile-form" onSubmit={handleUpdate}>
            <h2 className="text-center mb-4">Profile Information</h2>
            <Form.Group controlId="formUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="form-control-dark"
              />
            </Form.Group>
            <Form.Group controlId="formPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*current-password*"
                className="form-control-dark"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-control-dark"
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label>Birthday</Form.Label>
              <Form.Control
                type="date"
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="form-control-dark"
              />
            </Form.Group>
            <Row>
              <Col>
                <Button variant="warning" type="submit" className=" mt-4">
                  Update Profile
                </Button>
                <Col className="d-flex justify-content-end">
                  <Button
                    variant="outline-danger btn-sm"
                    type="button"
                    className=" mt-3 mr-3"
                    onClick={handleDeregister}
                  >
                    Deregister
                  </Button>
                </Col>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <h3 className="mt-3 mb-4">Favorite Movies</h3>
      <Row className="mb-4">
        {favoriteMoviesList.length > 0 ? (
          favoriteMoviesList.map((movie) => (
            <Col key={movie.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <MovieCard
                movie={movie}
                showRemoveButton={true}
                onRemove={removeFromFavorites}
              />
            </Col>
          ))
        ) : (
          <p>No favorite movies yet!</p>
        )}
      </Row>
    </Container>
  );
};