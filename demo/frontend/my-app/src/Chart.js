import React, {useEffect, useState} from 'react';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer} from 'recharts';

export const Example = ({orders}) => {

    const now = new Date();
    const dayOfMonth = now.getDate();
    const lastSevenDaysFromNow = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));

    const modifiedOrders = orders.filter(order => new Date(order.createdOn) >= lastSevenDaysFromNow);
    console.log(modifiedOrders)
    const [totalArray, setTotalArray] = useState([]);

    useEffect(() => {
        getTotal();
    }, [])

    function getTotal() {
        let firstDay = 0;
        let secondDay = 0;
        let thirdDay = 0;
        let fourthDay = 0;
        let fifthDay = 0;
        let sixthDay = 0;
        let seventhDay = 0;

        modifiedOrders.forEach(order => {
            if (new Date(order.createdOn).getDate() === dayOfMonth - 6) {
                firstDay += order.total;
            } else if (new Date(order.createdOn).getDate() === dayOfMonth - 5) {
                secondDay += order.total;
            } else if (new Date(order.createdOn).getDate() === dayOfMonth - 4) {
                thirdDay += order.total;
            } else if (new Date(order.createdOn).getDate() === dayOfMonth - 3) {
                fourthDay += order.total;
            } else if (new Date(order.createdOn).getDate() === dayOfMonth - 2) {
                fifthDay += order.total;
            } else if (new Date(order.createdOn).getDate() === dayOfMonth - 1) {
                sixthDay += order.total;
            } else if (new Date(order.createdOn).getDate() === dayOfMonth) {
                seventhDay += order.total;
            }
        });

        const data = [
            {name: dayOfMonth - 6 + "/" + (now.getMonth() + 1) + "/" + now.getFullYear(), uv: firstDay},
            {name: dayOfMonth - 5 + "/" + (now.getMonth() + 1) + "/" + now.getFullYear(), uv: secondDay},
            {name: dayOfMonth - 4 + "/" + (now.getMonth() + 1) + "/" + now.getFullYear(), uv: thirdDay},
            {name: dayOfMonth - 3 + "/" + (now.getMonth() + 1) + "/" + now.getFullYear(), uv: fourthDay},
            {name: dayOfMonth - 2 + "/" + (now.getMonth() + 1) + "/" + now.getFullYear(), uv: fifthDay},
            {name: dayOfMonth - 1 + "/" + (now.getMonth() + 1)  + "/" + now.getFullYear(), uv: sixthDay},
            {name: dayOfMonth + "/" + (now.getMonth() + 1) + "/" + now.getFullYear(), uv: seventhDay},
        ];

        setTotalArray(data);
    }

    return (
        <div style={{width: '100%'}}>
            <ResponsiveContainer width="100%" height={200}>
                <LineChart
                    width={500}
                    height={200}
                    data={totalArray}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip/>
                    <Line connectNulls type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8"/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}