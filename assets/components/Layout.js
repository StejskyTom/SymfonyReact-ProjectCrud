import React from 'react';
import {Link} from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Searchbar from "./Searchbar";
import Footer from "./Footer";

const Layout =({children}) =>{
    return(
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">ProjektyStejskal</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link
                            className={"nav-link"}
                            to="/projects">Správa projektů
                        </Link>
                        <Link
                            className={"nav-link"}
                            to="/users">Správa uživatelů
                        </Link>
                    </Nav>
                </Container>
            </Navbar>
            <div className="body-container">
                {children}
            </div>
            <Footer/>
        </>
    )
}

export default Layout;