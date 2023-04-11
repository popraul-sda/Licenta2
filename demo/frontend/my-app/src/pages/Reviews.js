import {Header} from "../components/product-page-components/Header";
import {MenuContainer} from "../components/product-page-components/MenuContainer";
import {Chat, HomeRounded, Settings, SummarizeRounded} from "@mui/icons-material";
import "../styles/App.css";
import {useEffect} from "react";

export function Reviews(){

    useEffect(() => {
        const menuLi = document.querySelectorAll("#menu li");

        function setMenuActive(){
            menuLi.forEach(n => n.classList.remove("hover"));
            this.classList.add("hover");
        }

        menuLi.forEach(n => n.addEventListener('mouseover', setMenuActive));

    }, []);

    return (
      <div>
          <div>
              <Header />
              <div className="bottomMenu">
                  <ul id="menu">
                      <MenuContainer link={'/'} icon = {<HomeRounded />} isHome/>
                      <MenuContainer link={'/reviews'} icon = {<Chat />} />
                      <MenuContainer link={'/contact'} icon = {<SummarizeRounded />} />
                      {
                          sessionStorage.getItem('role') ? sessionStorage.getItem('role') === 'ADMIN' ? <MenuContainer link={'/settings'} icon = {<Settings />} /> : null : null
                      }
                      <div className="indicator">
                      </div>
                  </ul>
              </div>
          </div>
      </div>
    );
}