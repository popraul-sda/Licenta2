import "../styles/App.css";
import {Header} from "../components/product-page-components/Header";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import {BottomMenu} from "../components/BottomMenu";

export function ManagerPortal(){

    let navigate = useNavigate();

    return (
        <div>
            <Header />
            <div className="menu-manager">
                <Button variant="primary" onClick={() => navigate("/managerPortalProducts")}>Products</Button>{' '}
                <Button variant="primary">Orders</Button>{' '}
            </div>
            <BottomMenu />
        </div>
    );
}