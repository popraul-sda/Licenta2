import "../../styles/App.css";
import {Header} from "../../components/product-page-components/Header";
import Button from "react-bootstrap/Button";
import {BottomMenu} from "../../components/product-page-components/BottomMenu";
import React, {useEffect, useState} from "react";
import {ManagerPortalProducts} from "./ManagerPortalProducts";
import {ManagerPortalOrders} from "./ManagerPortalOrders";
import {Example} from "./Chart";
import {ChartBars} from "./ChartBars";
import '../../styles/managerPortalProducts.css';

export function ManagerPortal(){

    const [active, setActive] = useState('products');
    const [orders, setOrders] = useState('orders');

    useEffect(() => {
        getOrders();
    }, [])

    function getOrders() {
        fetch("http://localhost:8080/showOrders", {
            method: "GET",
        })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setOrders(data);
            });
    }

    return (
        <div>
            <Header />
            <div className="menu-manager">
                <Button variant="primary" onClick={() => setActive('products')}>Products</Button>{' '}
                <Button variant="primary" onClick={() => setActive('orders')}>Orders</Button>{' '}
                <Button variant="primary" onClick={() => setActive('orders-last7')}>Sales/seven days</Button>{' '}
                <Button variant="primary" onClick={() => setActive('number-last7')}>Number of orders/last seven days</Button>{' '}
            </div>
            {
                active === 'products' ?
                    <ManagerPortalProducts />
                    :
                    active === 'orders' ?
                    <ManagerPortalOrders orders={orders}/>
                        :
                        active === 'orders-last7' ?
                        <Example orders={orders}/>
                            :
                            <div className="bar-chart">
                                <ChartBars orders={orders}/>
                            </div>
            }
            <BottomMenu />
        </div>
    );
}