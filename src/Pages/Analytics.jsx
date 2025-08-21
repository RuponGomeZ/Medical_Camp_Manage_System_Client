import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import useAxiosPublic from '../hooks/useAxiosPublic';
import PageTitle from '../Components/PageTitle';

const Analytics = () => {
    const axiosPublic = useAxiosPublic();

    const { data: chartData = [], refetch } = useQuery({
        queryKey: ['registrations'],
        queryFn: async () => {
            const response = await axiosPublic('/registered-camps', { withCredentials: true });
            return response.data;
        }
    });

    const pieChartData = chartData.map(data => {
        return { name: data.campName, CampFees: data.campFees };
    });

    return (
        <div className="w-full h-[70vh] min-h-[300px] p-2">
            <PageTitle title="Analytics"></PageTitle>

            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={pieChartData}
                    margin={{
                        top: 20,
                        right: 20,
                        left: 10,
                        bottom: pieChartData.length > 3 ? 100 : 60,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                        dataKey="name"
                        angle={window.innerWidth < 768 ? -45 : 0}
                        textAnchor="end"
                        height={window.innerWidth < 768 ? 100 : 60}
                        tick={{ fontSize: 12 }}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                        dataKey="CampFees"
                        fill="#8884d8"
                        activeBar={<Rectangle fill="pink" stroke="blue" />}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Analytics;