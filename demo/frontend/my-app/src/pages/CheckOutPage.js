import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import {Header} from "../components/product-page-components/Header";
import React, {useEffect, useState} from "react";
import "../styles/App.css";
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/checkout.css";
import {useStateValue} from "../components/product-page-components/StateProvider";
import {BottomMenu} from "../components/product-page-components/BottomMenu";
import CountdownTimer from "../components/CountdownTimer/CountdownTimer";
import {CheckCircle, DeliveryDining, Description, Fastfood} from "@mui/icons-material";

export function CheckOutPage(){

    let navigate = useNavigate();
    let data = [];
    let quantities = [];
    const date = new Date();
    const [name, setName] = useState(sessionStorage.getItem('name'));
    const [email, setEmail] = useState(sessionStorage.getItem('email'));
    const [phone, setPhone] = useState(sessionStorage.getItem('phone_number'));
    const [changeScreen, setChangeScreen] = useState(false);
    const [address, setAddress] = useState('');
    const [{ cart,total }] = useStateValue();
    const [selectedOption, setSelectedOption] = useState('Ramburs');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    }

    function login(){
        sessionStorage.getItem('name') ? toast("Already logged in!") : navigate("/login", {state: {href: window.location.pathname}});
    }

    function finalizeOrder(){
        name === '' || email === '' || phone === '' || address === '' ? toast("You need to complete all of the details!") :
            selectedOption === 'Card' ? toast("Not implemented") : addOrder()
    }

    function addOrder(){

        filterData();

        fetch('http://localhost:8080/addOrder', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "order": {
                    "clientName": name,
                    "clientEmail": email,
                    "clientPhoneNumber": phone,
                    "clientAddress": address,
                    "paymentMethod": selectedOption,
                    "total": total < 50 ? total + 10 : total,
                    "createdOn": date.toLocaleString()
                },
                "products": data,
                "quantities":quantities
            })
        })
            .then(null)

        toast("All good")

        setChangeScreen(true);
    }

    function filterData(){
        cart.forEach(item => {
            data.push(item[0])
            quantities.push(item[0].quantity)
        })
    }

    return (
      <div className="main-container">
          <Header />
          {
              changeScreen ?
                  <div>
                      <p className="timer-text">Time until your order arrives: </p>
                      <CountdownTimer countdownTimestampMs={date.getTime() + 30 * 60 * 1000}/>
                      <div className="order-progress">
                          <Description className="order-received large"/>
                          <Fastfood className="order-inProcess large"/>
                          <DeliveryDining className="order-delivery large"/>
                          <CheckCircle className="order-delivered large"/>
                      </div>
                      {
                          cart ? cart.map(item =>
                                  <div className="active-order-items">
                                      <p className="order-text">{item[0].quantity} x {item[0].name}   {item[0].price} lei</p>
                                      <br />
                                      <br />
                                  </div>
                              )
                              : null
                      }
                  </div>
                  :
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
                                      value="Ramburs"
                                      onChange={handleOptionChange}
                                      checked
                                  />
                                  Ramburs
                              </label>
                              <br />
                              <label>
                                  <input
                                      type="radio"
                                      value="Card"
                                      onChange={handleOptionChange}
                                      disabled
                                  />
                                  Plata cu card
                              </label>
                              <br />
                              <label>
                                  <input
                                      type="radio"
                                      value="Card"
                                      checked={selectedOption === 'Card'}
                                      onChange={handleOptionChange}
                                      disabled
                                  />
                                  Crypto
                              </label>
                          </div>
                          <Button variant="primary" className="finalize-button" onClick={() => finalizeOrder()}>Finalize Order</Button>{' '}
                      </div>
                  </div>
          }
          <BottomMenu />
          <ToastContainer />
      </div>
    );
}