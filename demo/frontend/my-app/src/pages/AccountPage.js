import Button from 'react-bootstrap/Button';
import {useEffect} from "react";
import {Header} from "../components/product-page-components/Header";
import {MenuContainer} from "../components/product-page-components/MenuContainer";
import {Chat, HomeRounded, Settings, SummarizeRounded} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

export function AccountPage(){

        let navigate = useNavigate();

        useEffect(() => {
            const menuLi = document.querySelectorAll("#menu li");

            function setMenuActive(){
                menuLi.forEach(n => n.classList.remove("hover"));
                this.classList.add("hover");
            }

            menuLi.forEach(n => n.addEventListener('mouseover', setMenuActive));

        }, []);

        function logOut(){
            fetch('http://localhost:8080/logout', {
                method: "POST"
            }).then(function(res){
                return res.json();
            }).then(function (){
                sessionStorage.removeItem('name');
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('role');
                sessionStorage.removeItem('phone_number');
                sessionStorage.removeItem('token');
                navigate("/");
            })
        }

    return (
      <div className="main-container">
          <Header />
          <Button variant="primary">Account Details</Button>{' '}
          <Button variant="primary">Active Order</Button>{' '}
          <Button variant="primary">History</Button>{' '}
          <Button variant="primary" onClick={() => logOut()}>Log out</Button>{' '}
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