import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { Header } from "../../components/product-page-components/Header";
import "../../styles/App.css";
import "../../styles/managerPortalProducts.css";
import { BottomMenu } from "../../components/product-page-components/BottomMenu";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React from 'react';
import Example from "../../Chart";

export function ManagerPortalOrders() {
    const [orders, setOrders] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        getOrders();
    }, []);

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

    function handleRowClick(id) {
        setSelectedRow(id);
    }

    function handleStartDateChange(event) {
        setStartDate(event.target.value);
    }

    function handleEndDateChange(event) {
        setEndDate(event.target.value);
    }

    function getTime(date){
        const date1 = new Date(date);

        return date1.getTime();
    }

    function getTotalInInterval(){

        let total = 0;
        let total2 = 0;

        orders.forEach(item => {
            if(getTime(item.createdOn) >= getTime(startDate) && getTime(item.createdOn) <= getTime(endDate)){
                total += item.total;
            }
            total2 += item.total;
        })

       if(startDate !== null && endDate !== null) return total
       else return total2;
    }

    return (
        <div className="product-container">
            <Header />
            <div className="date-filter">
                <label htmlFor="startDate">Start date:</label>
                <input type="date" id="startDate" name="startDate" onChange={handleStartDateChange} />
                <label htmlFor="endDate">End date:</label>
                <input type="date" id="endDate" name="endDate" onChange={handleEndDateChange} />
            </div>
            <Table striped bordered hover className="mt-5 mb-4">
                <thead>
                <tr>
                    <th>Order Id</th>
                    <th>Client Name</th>
                    <th>Client Email</th>
                    <th>Client Phone Number</th>
                    <th>Client Address</th>
                    <th>Payment Method</th>
                    <th>Date</th>
                </tr>
                </thead>
                {
                    startDate !== null && endDate !== null ?
                        <tbody>
                        {orders.map((item) => (
                            getTime(item.createdOn) >= getTime(startDate) && getTime(item.createdOn) <= getTime(endDate) &&(
                            <React.Fragment key={item.id}>
                                <tr
                                    key={item.id}
                                    onClick={() => handleRowClick(item.id)}
                                    className={selectedRow === item.id ? "selected" : ""}
                                >
                                    <th>{item.id}</th>
                                    <th>{item.clientName}</th>
                                    <th>{item.clientEmail}</th>
                                    <th>{item.clientPhoneNumber}</th>
                                    <th>{item.clientAddress}</th>
                                    <th>{item.paymentMethod}</th>
                                    <th>{item.createdOn}</th>
                                </tr>
                                {selectedRow === item.id && (
                                    <tbody>
                                    {item.orderItems.map(orderItem => (
                                        <tr key={orderItem.id}>
                                            <td colSpan="7">
                                                <p>{orderItem.quantity} x {orderItem.product.name}<span className="spatiu"/>{orderItem.product.price} lei</p>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="7">
                                            <p>Total: {item.total} lei</p>
                                        </td>
                                    </tr>
                                    </tbody>
                                )}
                            </React.Fragment>
                            )
                        ))}
                        </tbody>
                        :
                        <tbody>
                        {orders.map((item) => (
                            <React.Fragment key={item.id}>
                                <tr
                                    key={item.id}
                                    onClick={() => handleRowClick(item.id)}
                                    className={selectedRow === item.id ? "selected" : ""}
                                >
                                    <th>{item.id}</th>
                                    <th>{item.clientName}</th>
                                    <th>{item.clientEmail}</th>
                                    <th>{item.clientPhoneNumber}</th>
                                    <th>{item.clientAddress}</th>
                                    <th>{item.paymentMethod}</th>
                                    <th>{item.createdOn}</th>
                                </tr>
                                {selectedRow === item.id && (
                                    <tbody>
                                    {item.orderItems.map(orderItem => (
                                        <tr key={orderItem.id}>
                                            <td colSpan="7">
                                                <p>{orderItem.quantity} x {orderItem.product.name}<span className="spatiu"/>{orderItem.product.price} lei</p>
                                            </td>
                                        </tr>
                                    ))}
                                    <tr>
                                        <td colSpan="7">
                                            <p>Total: {item.total} lei</p>
                                        </td>
                                    </tr>
                                    </tbody>
                                )}
                            </React.Fragment>
                        ))}
                        </tbody>
                }
            </Table>
            <Example />
            <div>
                <p className="total-orders">Total: {getTotalInInterval()}lei</p>
            </div>
            <BottomMenu />
            <ToastContainer />
        </div>
    );
}
