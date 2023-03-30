import "../styles/App.css";
import {Header} from "../components/Header";
import {MenuContainer} from "../components/MenuContainer";
import {
    AccountBalanceWalletRounded,
    Chat,
    Favorite,
    HomeRounded,
    Settings,
    SummarizeRounded
} from "@mui/icons-material";
import {useEffect} from "react";
import {BannerName} from "../components/BannerName";

export function ProductsPage(){

    useEffect(() => {
        const menuLi = document.querySelectorAll("#menu li");

        function setMenuActive(){
            menuLi.forEach(n => n.classList.remove("hover"));
            this.classList.add("hover");
        }

        menuLi.forEach(n => n.addEventListener('mouseover', setMenuActive))
    }, [])

    return (
      <div className="App">
          {/* Header Section */}
          <Header />
          {/* Main Container */}
          <main>
              <div className="mainContainer">
                  <div className="banner">
                      <BannerName name={"Raul"} discount={"20"} link={"#"}/>
                      <img src="https://firebasestorage.googleapis.com/v0/b/food-delivery-37c59.appspot.com/o/Images%2Fdelivery.png?alt=media&token=69b9823d-96df-452a-bd4e-14d27a4cc337"
                           alt=""
                           className="deliveryPic"
                      />
                  </div>
                  <div className="rightMenu">

                  </div>
              </div>
          </main>
          {/* Bottom Menu */}

          <div className="bottomMenu">
              <ul id="menu">
                  <MenuContainer link={'#'} icon = {<HomeRounded />} />
                  <MenuContainer link={'#'} icon = {<Chat />} />
                  <MenuContainer link={'#'} icon = {<AccountBalanceWalletRounded />} />
                  <MenuContainer link={'#'} icon = {<Favorite />} />
                  <MenuContainer link={'#'} icon = {<SummarizeRounded />} />
                  <MenuContainer link={'#'} icon = {<Settings />} />
                  <div className="indicator">
                  </div>
              </ul>
          </div>
      </div>
    );
}