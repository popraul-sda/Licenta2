import React, {useEffect, useState} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ChartBars = ({orders}) => {

    const now = new Date();
    const dayOfMonth = now.getDate();
    const lastSevenDaysFromNow = new Date(now.getTime() - (7 * 24 * 60 * 60 * 1000));

    const modifiedOrders = orders.filter(order => new Date(order.createdOn) >= lastSevenDaysFromNow);
    const [totalArray, setTotalArray] = useState([]);

    useEffect(() => {
        getTotal();
    }, [orders])

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
                firstDay ++;
            } else if (new Date(order.createdOn).getDate() === dayOfMonth - 5) {
                secondDay ++;
            } else if (new Date(order.createdOn).getDate() === dayOfMonth - 4) {
                thirdDay ++;
            } else if (new Date(order.createdOn).getDate() === dayOfMonth - 3) {
                fourthDay ++;
            } else if (new Date(order.createdOn).getDate() === dayOfMonth - 2) {
                fifthDay ++;
            } else if (new Date(order.createdOn).getDate() === dayOfMonth - 1) {
                sixthDay ++;
            } else if (new Date(order.createdOn).getDate() === dayOfMonth) {
                seventhDay ++;
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
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={totalArray}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        )
}
