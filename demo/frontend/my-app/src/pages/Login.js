import {useState} from "react";
import "../styles/login.css";
import { useNavigate  } from 'react-router-dom';

export function Login(){

    const [username, setUsername] = useState(localStorage.getItem('username'));
    const [password, setPassword] = useState(localStorage.getItem('password'));
    const [remember, setRemember] = useState(false);
    const [errorMessage, setErrormessage] = useState(true);
    let navigate = useNavigate();

    function sendLoginRequest() {

        const reqBody = {
            "userName": username,
            "password": password,
        };


        fetch('http://localhost:8080/api/v1/auth/login', {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(reqBody),
        })
        .then(function(response){
            return response.json();
        }).then(function(data) {
            sessionStorage.setItem('token', data.token);
            getUserInfo();
        }).catch(error => {
            setErrormessage(false);
            console.log(error);
        })

    }

    function getUserInfo(){
        fetch('http://localhost:8080/api/v1/auth/userinfo', {
            headers:{
                'Authorization':'Bearer ' + sessionStorage.getItem('token')
            },
            method: "GET"
        }).then(function(res){
            return res.json();
        }).then(function (data){
            sessionStorage.setItem('role', data.roles[0].roleCode);
            navigate('/dashboard');
        }).catch(error => console.log(error))

    }

    const handleCheckBox = event => {
        if (event.target.checked) {
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
        }
        setRemember(current => !current);
    };

    return (
        <>
            <section>
                <div className="form-box">
                    <div className="form-value">
                            <h2>Login</h2>
                            <div className="inputbox">
                                <ion-icon name="username-outline"></ion-icon>
                                <input type="text" required value={username} onChange={e => setUsername(e.target.value)}/>
                                    <label htmlFor="">Username</label>
                            </div>
                            <div className="inputbox">
                                <ion-icon name="lock-closed-outline"></ion-icon>
                                <input type="password" required value={password} onChange={e => setPassword(e.target.value)}/>
                                    <label htmlFor="">Password</label>
                            </div>
                            <div className="forget">
                                <label htmlFor=""><input type="checkbox" value={remember} onChange={handleCheckBox}/>Remember Me <a href="/">Forget
                                    Password</a></label>
                            </div>
                            <button onClick={sendLoginRequest}>Log in</button>
                            <div className="register">
                                <p>Don't have a account <a href="/register">Register</a></p>
                            </div>
                            <div className="message">
                                {errorMessage ? null : <div className="danger" id="danger">Wrong credentials!</div>}
                            </div>
                    </div>
                </div>
            </section>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        </>
    );
}