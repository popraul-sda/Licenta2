import {useState} from "react";
import "../styles/login.css";
import { useNavigate  } from 'react-router-dom';

export function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
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
        .then((response)=>{

            console.log("response",response);
            if(response.status===200){
                navigate('/dashboard');
            }

        })



    }

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
                                <label htmlFor=""><input type="checkbox" />Remember Me <a href="/">Forget
                                    Password</a></label>
                            </div>
                            <button onClick={sendLoginRequest}>Log in</button>
                            <div className="register">
                                <p>Don't have a account <a href="/">Register</a></p>
                            </div>
                    </div>
                </div>
            </section>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        </>
    );
}