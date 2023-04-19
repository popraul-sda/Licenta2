import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import {Header} from "../components/product-page-components/Header";
import {MenuContainer} from "../components/product-page-components/MenuContainer";
import {Chat, HomeRounded, Settings, SummarizeRounded} from "@mui/icons-material";
import {useEffect, useState} from "react";
import "../styles/App.css";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/checkout.css";
import {useStateValue} from "../components/product-page-components/StateProvider";

export function CheckOutPage(){

    let navigate = useNavigate();
    const [name, setName] = useState(sessionStorage.getItem('name'));
    const [email, setEmail] = useState(sessionStorage.getItem('email'));
    const [phone, setPhone] = useState(sessionStorage.getItem('phone_number'));
    const [address, setAddress] = useState('');
    const [{ cart,total }] = useStateValue();
    const [selectedOption, setSelectedOption] = useState('option1');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    }

    useEffect(() => {
        const menuLi = document.querySelectorAll("#menu li");

        function setMenuActive(){
            menuLi.forEach(n => n.classList.remove("hover"));
            this.classList.add("hover");
        }

        menuLi.forEach(n => n.addEventListener('mouseover', setMenuActive));

    }, [cart, total]);

    function login(){
        sessionStorage.getItem('name') ? toast("Already logged in!") : navigate("/login", {state: {href: window.location.pathname}});
    }

    function finalizeOrder(){
        name === '' || email === '' || phone === '' || address === '' ? toast("You need to complete all of the details!") :
            selectedOption === 'option2' ? toast("Not implemented") : toast("All good")
    }

    return (
      <div className="main-container">
          <Header />
          <div className="main-content">
              <div className="details-container">
                  <h2>Details</h2>
                  <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1"><PersonIcon /></InputGroup.Text>
                      <Form.Control
                          placeholder="Nume/Prenume"
                          aria-label="nume-prenume"
                          aria-describedby="basic-addon1"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                      />
                  </InputGroup>
                  <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1"><EmailIcon /></InputGroup.Text>
                      <Form.Control
                          placeholder="Email"
                          aria-label="email"
                          aria-describedby="basic-addon1"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                      />
                  </InputGroup>
                  <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1"><PhoneIcon /></InputGroup.Text>
                      <Form.Control
                          placeholder="Phone Number"
                          aria-label="phone-number"
                          aria-describedby="basic-addon1"
                          type="number"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          required
                      />
                  </InputGroup>
                  <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1"><HomeIcon /></InputGroup.Text>
                      <Form.Control
                          placeholder="Address"
                          aria-label="address"
                          aria-describedby="basic-addon1"
                          value={address}
                          onChange={e => setAddress(e.target.value)}
                          required
                      />
                  </InputGroup>
                  <p>Or</p>
                  <br />
                  <Button className="log-in-button" variant="primary" onClick={() => login()}>Log In</Button>{' '}
              </div>
              <div className="order-container">
                  <h2>Items</h2>
                  {
                      cart.map((item) => <p key={item[0].id}>{item[0].quantity} x {item[0].name}</p>)
                  }
                  <hr />
                  <p>Total: {total < 50 ? total + 10: total} lei</p>
              </div>
              <div className="payment-container">
                  <h2>Payment</h2>
                  <div className="payment-options">
                      <label>
                          <input
                              type="radio"
                              value="option1"
                              checked={selectedOption === 'option1'}
                              onChange={handleOptionChange}
                          />
                          Ramburs
                      </label>
                      <br />
                      <label>
                          <input
                              type="radio"
                              value="option2"
                              checked={selectedOption === 'option2'}
                              onChange={handleOptionChange}
                          />
                          Plata cu card
                      </label>
                  </div>
                  <Button variant="primary" className="finalize-button" onClick={() => finalizeOrder()}>Finalize Order</Button>{' '}
              </div>
          </div>
          <div className="bottomMenu">
              <ul id="menu">
                  <MenuContainer link={'/'} icon = {<HomeRounded />} isHome/>
                  <MenuContainer link={'/reviews'} icon = {<Chat />} />
                  <MenuContainer link={'/contact'} icon = {<SummarizeRounded />} />
                  {
                      sessionStorage.getItem('role') ? sessionStorage.getItem('role') === 'ADMIN' ? <MenuContainer link={'/managerPortal'} icon = {<Settings />} /> : null : null
                  }
                  <div className="indicator">
                  </div>
              </ul>
          </div>
          <ToastContainer />
      </div>
    );
}