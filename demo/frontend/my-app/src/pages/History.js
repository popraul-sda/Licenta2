import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";

export function History(){

    const [orders, setOrders] = useState([]);
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

        setOrders(orders.filter((item) => item.name === sessionStorage.getItem("name")))
    }

    function handleRowClick(id) {
        setSelectedRow(id);
    }

    return (
      <>
          <Table striped bordered hover style={{marginTop: 100}}>
              <thead>
              <tr>
                  <th>Order Id</th>
                  <th>Payment Method</th>
                  <th>Date</th>
              </tr>
              </thead>
              <tbody>
              {orders.map((item) => (
                  <React.Fragment key={item.id}>
                      <tr
                          key={item.id}
                          onClick={() => handleRowClick(item.id)}
                          className={selectedRow === item.id ? "selected" : ""}
                      >
                          <th>{item.id}</th>
                          <th>{item.paymentMethod}</th>
                          <th>{item.createdOn}</th>
                      </tr>
                      {selectedRow === item.id && (
                          <tr>
                              {
                                  item.orderItems.map(orderItem => (
                                      <tr>
                                          <td colSpan="7">
                                              <p>{orderItem.quantity} x {orderItem.product.name}<span className="spatiu"/>{orderItem.product.price} lei</p>
                                          </td>
                                      </tr>
                                  ))
                              }
                              <p>Total:  {item.total} lei</p>
                          </tr>
                      )}
                  </React.Fragment>
              ))}
              </tbody>
          </Table>
      </>
    );
}