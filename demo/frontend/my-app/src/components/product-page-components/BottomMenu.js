import {useEffect} from "react";
import "../../styles/App.css";
import {MenuContainer} from "./MenuContainer";
import {Chat, HomeRounded, Settings, SummarizeRounded} from "@mui/icons-material";

export function BottomMenu(){

    useEffect(() => {
        const menuLi = document.querySelectorAll("#menu li");

        function setMenuActive(){
            menuLi.forEach(n => n.classList.remove("hover"));
            this.classList.add("hover");
        }

        menuLi.forEach(n => n.addEventListener('mouseover', setMenuActive));

    }, []);

    return (
      <>
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
      </>
    );
}