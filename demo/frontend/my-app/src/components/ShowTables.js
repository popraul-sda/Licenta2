import {useEffect, useState} from "react";
import "../styles/index.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate } from "react-router-dom";


export function ShowTables({locationCheck}){
    const [tables, setTables] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        async function getData(){
            fetch('http://localhost:8080/tables')
                .then(res => res.json())
                .then(data => setTables(data))
        }

        getData();
    }, []);

    const handleRoute = (tableName) =>{
        const words = tableName.split(' ');
        let path = "/masa/" + words[1];
        navigate(path);
    }

    return (
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
            <div className="main-container">
                {tables.map((table) => {
                    if(table.location === locationCheck) {
                        if (table.status === "Free") return <div className="small-container-green" onClick={() => handleRoute(table.name)}>{table.name}</div>
                        else return <div className="small-container-red"onClick={() => handleRoute(table.name)}>{table.name}</div>
                    }
                    else return null;
                })}
            </div>
            <button className="menu">Menu</button>
        </>
    );
}