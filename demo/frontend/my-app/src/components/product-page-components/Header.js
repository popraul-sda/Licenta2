import {} from "@mui/material";
import {SearchRounded, ShoppingCartRounded} from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from "react-router-dom";
import {useStateValue} from "./StateProvider";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {useState} from "react";
import '../../styles/App.css';

export function Header({products}){

    let navigate = useNavigate();
    const [{cart}] = useStateValue();
    const [search, setSearch] = useState('');

    function goToLogin(){
        sessionStorage.getItem('name') ? navigate("/account") : navigate("/login", { state: { href: window.location.pathname} });
    }

    function logOut(){
        fetch('http://localhost:8080/logout', {
            method: "GET"
        }).then(function(res){
            console.log(res);
        })

        sessionStorage.clear();
        navigate("/");
    }

    function productDetails(name){
        const path = "/product/" + name.replace(/\s+/g, '');
        navigate(path, { state: { data: products.filter(product => product.name === name) } });
    }

    return (
      <header>
          <img src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Flogo.png?alt=media&token=fc228623-ef27-4af4-8ea5-b9ebeeaf47dc"
               alt=""
               className="logo"
          />

          {
              window.location.pathname === "/" ?
                  <div className="searchBox-container">
                      <div className="inputBox" >
                          <SearchRounded className="SearchIcon" />
                          <input id="search" type="text" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                          {
                              search && (
                                  <div className="search-results">
                                      {
                                          products
                                              .filter(item => item.name.toLowerCase().startsWith(search.toLowerCase()))
                                              .map(item => (
                                                  <p
                                                      key={item.id}
                                                      className="inputBox child"
                                                      onClick={() => productDetails(item.name)}
                                                  >
                                                      {item.name}
                                                  </p>
                                              ))
                                      }
                                  </div>
                              )
                          }
                      </div>
                  </div>
                  : null
          }


          {
              cart !== null ?
                  cart.length !== 0 && window.location.pathname === "/" ?
                  <div className="shoppingCart" >
                      <ShoppingCartRounded className="cart" />
                      <div className="cart_content">
                          <p>{cart ? cart.length : '0'}</p>
                      </div>
                  </div>
                  :
                  null
                  :
                  null
          }

          <div className="profileContainer">
              <div className="imgBox">
                  <PersonIcon />
              </div>
                  {
                    sessionStorage.getItem('name')  ?
                        <DropdownButton id="dropdown-basic-button" variant="Secondary" className="log-button" title={sessionStorage.getItem('name')}>
                            <Dropdown.Item onClick={() => goToLogin()}>Account</Dropdown.Item>
                            <hr />
                            <Dropdown.Item onClick={() => logOut()}>Log Out</Dropdown.Item>
                        </DropdownButton>
                        : <p className="log-p" onClick={() => goToLogin()}>Log in</p>
                  }
          </div>
      </header>
    );
}
