import Button from 'react-bootstrap/Button';
import {Header} from "../../components/product-page-components/Header";
import {BottomMenu} from "../../components/product-page-components/BottomMenu";
import {useState, useEffect} from "react";
import {AccountDetails} from "./AccountDetails";
import '../../styles/accountPage.css';
import {CurrentOrder} from "./CurrentOrder";
import {History} from "../History";

export function AccountPage() {

    const [active, setActive] = useState('');
    const [orders, setOrders] = useState([]);
    const [activeOrder, setActiveOrder] = useState(0);
    const currentDateInMilliseconds = Date.now();
    const [currentOrder, setCurrentOrder] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);

    function getOrders(){
        fetch("http://localhost:8080/showOrders", {
            method: "GET",
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                const filteredOrders = data.filter((item) => item.clientName === sessionStorage.getItem("name"));
                setOrders(filteredOrders);
                getCurrentOrder(filteredOrders);
            });
    }

    function getCurrentOrder(orders){
        orders.forEach(item => {
            if (getTime(item.createdOn) + 30 * 60 * 1000 > currentDateInMilliseconds){
                setActiveOrder(getTime(item.createdOn) + 30 * 60 * 1000);
                setCurrentOrder(item.orderItems);
            }
            else {
                setActiveOrder(0)
            }
        })
    }


    function getTime(date) {
        const date1 = new Date(date);

        return date1.getTime();
    }

    return (
        <div className="main-container">
            <Header/>
            {
                active === 'details' ?
                    <>
                        <Button variant="danger" className='close' onClick={() => setActive('')}>Close</Button>{' '}
                        <AccountDetails className='details'/>
                    </>
                    :
                    active === 'active' ?
                        <>
                            <Button variant="danger" className='close' onClick={() => setActive('')}>Close</Button>{' '}
                            <CurrentOrder countdownTimestampMs={activeOrder} co={currentOrder}/>
                        </>
                        :
                        active === 'history' ?
                            <>
                                <Button variant="danger" className='close'
                                        onClick={() => setActive('')}>Close</Button>{' '}
                                <History history={orders}/>
                            </>
                            :
                            <>
                                <Button variant="primary" onClick={() => setActive('details')}>Account
                                    Details</Button>{' '}
                                <Button variant="primary" onClick={() => setActive('active')}>Active Order</Button>{' '}
                                <Button variant="primary" onClick={() => setActive('history')}>History</Button>{' '}
                            </>
            }
            {
                active !== 'history' ?  <BottomMenu/> : null
            }
        </div>
    );
}