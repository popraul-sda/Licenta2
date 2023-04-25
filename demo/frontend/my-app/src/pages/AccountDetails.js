import {useState} from "react";
import "../styles/accountPage.css";
import {toast, ToastContainer} from "react-toastify";

export function AccountDetails(){

    let myArray = sessionStorage.getItem('name').split(" ");

    const [firstName, setFirstName] = useState(myArray[0]);
    const [lastName, setLastName] = useState(myArray[1]);
    const [email, setEmail] = useState(sessionStorage.getItem('email'));
    const [phone, setPhone] = useState(sessionStorage.getItem('phone_number'));

    function handleSubmit(){

        if(firstName === '' || lastName === '' || email === '' || phone === '') toast("Complete all the details");
        else {
            fetch('http://localhost:8080/api/v1/auth/user', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':'Bearer ' + sessionStorage.getItem('token')
                },
                body: JSON.stringify({
                    "email": email,
                    "firstName": firstName,
                    "lastName": lastName,
                    "phoneNumber": phone,
                })
            })
                .then()

            sessionStorage.setItem('name', firstName + " " + lastName);
            sessionStorage.setItem('email', email);
            sessionStorage.setItem('phone_number', phone);

            toast("User data updated!");
        }

    }

    return (
        <>
            <section>
                <div className="form-box" style={{ margin: "80px" }}>
                    <div className="form-value">
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
                        <button onClick={handleSubmit}>Save Details</button>
                    </div>
                </div>
                <ToastContainer />
            </section>
            <script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"></script>
            <script noModule src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"></script>
        </>
    );
}