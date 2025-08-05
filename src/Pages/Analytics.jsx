import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAxiosPublic from '../hooks/useAxiosPublic';




const Analytics = () => {



    const axiosPublic = useAxiosPublic()


    const { data: chartData = [], refetch } = useQuery({
        queryKey: ['registrations'],
        queryFn: async () => {
            const response = await axiosPublic('/registered-camps', { withCredentials: true })
            return response.data;
        }
    })

    const pieChartData = chartData.map(data => {
        return { name: data.campName, CampFees: data.campFees }
    })

    console.log(pieChartData);
    return (
        <ResponsiveContainer width="90%" height="80%">
            <BarChart
                width={100}
                height={300}
                data={pieChartData}
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
                <Bar dataKey="CampFees" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
            </BarChart>
        </ResponsiveContainer>

    );
};

export default Analytics;