import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import {Header} from "../components/product-page-components/Header";
import {MenuContainer} from "../components/product-page-components/MenuContainer";
import {Chat, HomeRounded, Settings, SummarizeRounded} from "@mui/icons-material";
import {useEffect} from "react";
import "../styles/App.css";

export function CheckOutPage(){

    useEffect(() => {
        const menuLi = document.querySelectorAll("#menu li");

        function setMenuActive(){
            menuLi.forEach(n => n.classList.remove("hover"));
            this.classList.add("hover");
        }

        menuLi.forEach(n => n.addEventListener('mouseover', setMenuActive));

    }, []);

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
                      />
                  </InputGroup>
                  <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1"><EmailIcon /></InputGroup.Text>
                      <Form.Control
                          placeholder="Email"
                          aria-label="email"
                          aria-describedby="basic-addon1"
                      />
                  </InputGroup>
                  <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1"><PhoneIcon /></InputGroup.Text>
                      <Form.Control
                          placeholder="Phone Number"
                          aria-label="phone-number"
                          aria-describedby="basic-addon1"
                          type="number"
                      />
                  </InputGroup>
                  <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1"><HomeIcon /></InputGroup.Text>
                      <Form.Control
                          placeholder="Address"
                          aria-label="address"
                          aria-describedby="basic-addon1"
                      />
                  </InputGroup>
              </div>
              <div className="order-container">
                  Items
              </div>
              <div className="payment-container">
                  Payment
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
      </div>
    );
}