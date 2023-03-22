import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import {Button} from "react-bootstrap";
import {useState} from "react";
import "../useless/index.css";
import { useLocalState } from "../util/useLocalStorage";

export function LoginPage(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [jwt, setJwt] = useLocalState("", "jwt");

    function sendLoginRequest() {

        const reqBody = {
            username: username,
            password: password,
        };

        fetch("api/auth/login", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(reqBody),
        })
            .then((response) => Promise.all([response.json(), response.headers]))
            .then(([body, headers]) => {
                setJwt(headers.get("authorization"));
            });
    }

    return (
        <>
            <InputGroup className="mb-3 ms-2 mt-2">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
            </InputGroup>
            <InputGroup className="mb-3 ms-2">
                <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                <Form.Control
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </InputGroup>
            <Button variant="primary" className="ms-2" onClick={() => sendLoginRequest()}>Login</Button>{' '}
        </>
    );
}