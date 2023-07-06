import React, {useEffect, useState} from "react";
import Table from "react-bootstrap/Table";
import "../../styles/App.css";
import "../../styles/managerPortalProducts.css";

export function History({history}){

    const [orders, setOrders] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    useEffect(() => {
        setOrders(history);
    }, []);

    function handleRowClick(id) {
        setSelectedRow(id);
    }

    return (
      <>
          <Table className="history-table mb-4" striped bordered hover>
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
          <div className="total-orders">
              <p>{orders.length} Orders in total</p>
          </div>
      </>
    );
}