import "../styles/index.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import 'bootstrap/dist/css/bootstrap.min.css'
import {useParams} from "react-router";


export function TableContents(){

    const {id} = useParams();

    return(
      <>
          <Navbar bg="light" expand="lg">
              <Container>
                  <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                          <Nav.Link href="/">Inside</Nav.Link>
                          <Nav.Link href="/outside">Outside</Nav.Link>
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
          <div className="main">
              <div className="sus">
                  <div className="masa">Masa {id}</div>
                  <div className="suma"></div>
              </div>
              <div className="jos">
                  <div className="meniu">
                      <div className="meniu-lista"></div>
                      <div className="meniu-produse"></div>
                  </div>
                  <div className="altele"></div>
              </div>
          </div>
      </>
    );
}