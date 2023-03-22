import "../useless/index.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import {useLocation} from "react-router";

export function ProductInformation({productData}){

    const location = useLocation();

    return (
        <>
            <div>
                {location.state.id}
            </div>
            <div>
                {location.state.name}
            </div>
            <div>
                {location.state.desc}
            </div>
        </>
    );
}