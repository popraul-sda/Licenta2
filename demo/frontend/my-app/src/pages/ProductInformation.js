import {useLocation} from "react-router";
import "../styles/App.css";
import {Header} from "../components/product-page-components/Header";
import {MenuContainer} from "../components/product-page-components/MenuContainer";
import {
    Chat,
    HomeRounded,
    Settings,
    SummarizeRounded
} from "@mui/icons-material";
import "../styles/test.css";

export function ProductInformation(){

    const location = useLocation();
    const product = location.state?.data;

    return (
        <div className="informationContainer">
            <Header/>
            <main className="container">
                <div className="left-column">
                    <img data-image="red" className="active" src={product[0].fileData ? process.env.PUBLIC_URL + "/images/" + product[0].fileData.name : ""} alt=""/>
                </div>
                <div className="right-column">
                    <div className="product-description">
                        <span>{product[0].category}</span>
                        <h1>{product[0].name}</h1>
                        <p>
                            {product[0].description}
                        </p>
                    </div>
                    <div className="product-price">
                        <span>{product[0].price} lei</span>
                        <a href="/" className="cart-btn">Add to cart</a>
                    </div>
                </div>
            </main>
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
    );
}