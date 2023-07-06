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
import {Top} from "./Top";
import {ErrorPage} from "../ErrorPage";

export function ManagerPortal() {

    const [active, setActive] = useState('products');
    const [orders, setOrders] = useState('orders');
    const [error, setError] = useState(false);

    useEffect(() => {
        checkError();
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

    function checkError() {
        if (sessionStorage.getItem("token")) {
            fetch("http://localhost:8080/api/v1/auth/userinfo", {
                headers: {'Authorization': 'Bearer ' + sessionStorage.getItem('token')},
                method: "GET",
            })
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    data.roles[0].roleCode === "ADMIN" ? setError(false) : setError(true);
                })
        } else setError(true);
    }

    return (
        <div>
            {
                error ?
                    <ErrorPage/>
                    :
                    <div>
                        <Header/>
                        <div className="menu-manager">
                            <Button variant="primary" onClick={() => setActive('products')}>Products</Button>{' '}
                            <Button variant="primary" onClick={() => setActive('orders')}>Orders</Button>{' '}
                            <Button variant="primary" onClick={() => setActive('orders-last7')}>Sales/seven
                                days</Button>{' '}
                            <Button variant="primary" onClick={() => setActive('number-last7')}>Nr. orders/last seven
                                days</Button>{' '}
                            <Button variant="primary" onClick={() => setActive('top')}>Top 5</Button>{' '}
                        </div>
                        {
                            active === 'products' ?
                                <ManagerPortalProducts/>
                                :
                                active === 'orders' ?
                                    <ManagerPortalOrders orders={orders}/>
                                    :
                                    active === 'orders-last7' ?
                                        <Example orders={orders}/>
                                        :
                                        active === 'number-last7' ?
                                            <div className="bar-chart">
                                                <ChartBars orders={orders}/>
                                            </div>
                                            :
                                            <Top orders={orders}/>
                        }
                        <BottomMenu/>
                    </div>
            }
        </div>
    );
}