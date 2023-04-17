import {MenuContainer} from "../components/product-page-components/MenuContainer";
import {Chat, HomeRounded, Settings, SummarizeRounded} from "@mui/icons-material";
import "../styles/App.css";
import {Header} from "../components/product-page-components/Header";
import {useEffect} from "react";
import "../styles/contact.css";

export function Contact(){

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
            <Header />
            <div className="center-container">
                    <div className="address">
                        <h2>Address</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                    </div>
                    <div className="schedule">
                        <h2>Schedule</h2>
                        <ul>
                            <li>L: 8-21</li>
                            <li>M: 8-21</li>
                            <li>M: 8-21</li>
                            <li>J: 8-21</li>
                            <li>V: 8-21</li>
                            <li>S: 8-21</li>
                            <li>D: 8-21</li>
                        </ul>
                    </div>
                    <div className="contact">
                        <h2>Contact</h2>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry</p>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/800px-Facebook_icon.svg.png" alt="" href="https://facebook.com"/>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/58/Instagram-Icon.png" alt="" />
                    </div>
                    <div className="delivery-fee">
                        <h2>Delivery Fee</h2>
                        <p>Gratuit pentru comenzile de peste 50 lei</p>
                        <p>10 lei pentru comenzile mai mici de 50 lei</p>
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