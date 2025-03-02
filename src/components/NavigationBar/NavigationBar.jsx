import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import Switch from "react-switch";

export const NavigationBar = ({ user, onLoggedOut }) => {
    const storedTheme = localStorage.getItem("theme") || "light";
    const [theme, setTheme] = useState(storedTheme);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);
    return (
        <Navbar bg={theme === "light" ? "light" : "dark"} variant={theme === "light" ? "light" : "dark"} expand="lg" className="mb-5">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Movie App
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                Signup
                                </Nav.Link>
                            </>
                            )}
                            {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                Profile
                                </Nav.Link>
                                
                                <Nav.Link onClick={onLoggedOut}>Logout</Nav.Link>
                            </>
                            )}
                    </Nav>
                    <div className="d-flex align-items-center">
                        <span className="text-light me-2">
                            {theme === "light" ? "☀ Light" : "🌙 Dark"}
                        </span>
                        <Switch
                            checked={theme === "dark"}
                            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
                            offColor="#bbb"
                            onColor="#333"
                        />
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};