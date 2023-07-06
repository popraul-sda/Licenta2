import React from "react";
import Table from "react-bootstrap/Table";

export function Top({orders}){

    function calculateProductFrequencies() {
        const frequencies = {};

        orders.forEach(item => {
            item.orderItems.forEach(orderItem => {
                const productName = orderItem.product.name;
                if (frequencies[productName]) {
                    frequencies[productName] += orderItem.quantity;
                } else {
                    frequencies[productName] = orderItem.quantity;
                }
            });
        });

        return frequencies;
    }

    const productFrequencies = calculateProductFrequencies();

    const sortedProductFrequencies = Object.entries(productFrequencies)
        .sort(([, frequencyA], [, frequencyB]) => frequencyB - frequencyA);
    console.log(sortedProductFrequencies)

    return (
      <>
          <Table striped bordered hover className="mt-5 mb-4">
              <thead>
              <tr>
                  <th> </th>
                  <th>Product Name</th>
                  <th>Times the product was ordered</th>
              </tr>
              </thead>
              <tbody>
              {
                  sortedProductFrequencies.slice(0, 5).map((item, index) => (
                      <tr key={item[0]}>
                          <td>{index + 1}</td>
                          <td>{item[0]}</td>
                          <td>{item[1]}</td>
                      </tr>
                  ))
              }
              </tbody>
          </Table>
      </>
    );
}