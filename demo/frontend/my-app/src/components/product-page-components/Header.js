import {} from "@mui/material";
import {SearchRounded, ShoppingCartRounded} from "@mui/icons-material";
import PersonIcon from '@mui/icons-material/Person';
import {useNavigate} from "react-router-dom";
import {useStateValue} from "./StateProvider";

export function Header(){

    let navigate = useNavigate();
    const [{cart}] = useStateValue();

    function goToLogin(){
        sessionStorage.getItem('name') ? navigate("/account") : navigate("/login", { state: { href: window.location.pathname} });
    }

    return (
      <header>
          <img src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Flogo.png?alt=media&token=fc228623-ef27-4af4-8ea5-b9ebeeaf47dc"
               alt=""
               className="logo"
          />

          <div className="inputBox" >
              <SearchRounded className="SearchIcon" />
              <input type="text" placeholder="Search" />
          </div>

          <div className="shoppingCart" >
              <ShoppingCartRounded className="cart" />
              <div className="cart_content">
                  <p>{cart ? cart.length : '0'}</p>
              </div>
          </div>

          <div className="profileContainer">
              <div className="imgBox">
                  <PersonIcon />
              </div>

              <p className="userName" onClick={() => goToLogin()}>{sessionStorage.getItem('name')  ? sessionStorage.getItem('name') : "Log in"}</p>
          </div>
      </header>
    );
}