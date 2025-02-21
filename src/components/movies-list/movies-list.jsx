import React from "react";
import { useSelector} from "react-redux";
import { BookCard } from "../book-card/book-card";
import { BooksFilter } from "../books-filter/books-filter";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MoviesList = () => {
    const movies = useSelector((state) => state.movies.list);
    const filter = useSelector((state) =>
    state.movies.filter).trim().toLowerCase();
    const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(filter)
    );

    return (
        <>
            <Row>
                <MoviesFilter />
            </Row>
            <Row>
                {movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                ) : (
                  filteredMovies.map((movie) => (
                    <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                    </Col>
                    ))
                )}
            </Row>
        </>
    );
};
    