import {useState} from "react";
import "../../styles/login.css";
import {useNavigate} from "react-router-dom";

export function Register(){

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    let navigate = useNavigate();

    function handleSubmit(){
        fetch('http://localhost:8080/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "email": email,
                "firstName": firstName,
                "lastName": lastName,
                "phoneNumber": phone,
                "userName": username,
                "password": password
            })
        })
            .then()

        navigate("/login");

    }

    return (
      <>
      <section>
          <div className="form-box">
              <div className="form-value">
                  <h2>Register</h2>
                  <div className="inputbox">
                      <ion-icon name="first-name-outline"></ion-icon>
                      <input type="text" required value={firstName} onChange={e => setFirstName(e.target.value)}/>
                      <label htmlFor="">First Name</label>
                  </div>
                  <div className="inputbox">
                      <ion-icon name="lock-closed-outline"></ion-icon>
                      <input type="text" required value={lastName} onChange={e => setLastName(e.target.value)}/>
                      <label htmlFor="">Last Name</label>
                  </div>
                  <div className="inputbox">
                      <ion-icon name="lock-closed-outline"></ion-icon>
                      <input type="text" required value={email} onChange={e => setEmail(e.target.value)}/>
                      <label htmlFor="">Email</label>
                  </div>
                  <div className="inputbox">
                      <ion-icon name="lock-closed-outline"></ion-icon>
                      <input type="text" required value={phone} onChange={e => setPhone(e.target.value)}/>
                      <label htmlFor="">Phone Number</label>
                  </div>
                  <div className="inputbox">
                      <ion-icon name="lock-closed-outline"></ion-icon>
                      <input type="text" required value={username} onChange={e => setUsername(e.target.value)}/>
                      <label htmlFor="">Username</label>
                  </div>
                  <div className="inputbox">
                      <ion-icon name="lock-closed-outline"></ion-icon>
                      <input type="text" required value={password} onChange={e => setPassword(e.target.value)}/>
                      <label htmlFor="">Password</label>
                  </div>
                  <button onClick={handleSubmit}>Register</button>
              </div>
          </div>
      </section>
    <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
    <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
      </>
    );
}