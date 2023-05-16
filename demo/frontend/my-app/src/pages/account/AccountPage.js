import Button from 'react-bootstrap/Button';
import {Header} from "../../components/product-page-components/Header";
import {BottomMenu} from "../../components/product-page-components/BottomMenu";
import React, {useState, useEffect} from "react";
import {AccountDetails} from "./AccountDetails";
import '../../styles/accountPage.css';
import {CurrentOrder} from "./CurrentOrder";
import {History} from "../History";
import '../../styles/managerPortalProducts.css';

export function AccountPage() {

    const [active, setActive] = useState('active');
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
        <div>
            <Header/>
            <div className="menu-manager">
                <Button variant="primary" onClick={() => setActive('details')}>Account Details</Button>{' '}
                <Button variant="primary" onClick={() => setActive('active')}>Active Order</Button>{' '}
                <Button variant="primary" onClick={() => setActive('history')}>History</Button>{' '}
            </div>
            {
                active === 'details' ?
                    <>
                        <AccountDetails className='details'/>
                    </>
                    :
                    active === 'active' ?
                        <>
                            <CurrentOrder countdownTimestampMs={activeOrder} co={currentOrder} coTime={activeOrder - 30*60*1000}/>
                        </>
                        :
                        <History history={orders}/>
            }
            {
                active !== 'history' ?  <BottomMenu/> : null
            }
        </div>
    );
}