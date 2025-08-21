import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaHistory, FaUserCircle } from 'react-icons/fa';
import { MdAnalytics, MdAutoFixHigh, MdCampaign, MdOutlineGpsFixed } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import LoadingSpinner from '../Utilities/LoadingSpinner';
import { LiaCashRegisterSolid } from "react-icons/lia";
import Footer from '../Shared/Footer';

const Dashboard = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();

    const { data: userData = [], isLoading } = useQuery({
        queryKey: ['user', user.email],
        queryFn: async () => {
            const response = await axiosSecure(`users?email=${user.email}`);
            return response.data;
        }
    });

    if (isLoading || loading) return <LoadingSpinner />;

    return (
        <div className='flex flex-col min-h-screen'>
            <div className='flex flex-col md:flex-row'>
                {/* Sidebar - fixed width on desktop, full width on mobile */}
                <div className='w-full  md:w-64 bg-gray-500 '>
                    {
                        userData?.role === "organizer" ? (
                            <ul className='menu p-4'>
                                <li><NavLink to="/dashboard/profile"><FaUserCircle />Profile</NavLink></li>
                                <li><NavLink to="/dashboard/addCamp"><MdCampaign className='text-xl' />Add a Camp</NavLink></li>
                                <li><NavLink to="/dashboard/manage-camp"><MdAutoFixHigh className='text-lg' />Manage Camps</NavLink></li>
                                <li><NavLink to="/dashboard/manage-registered-camps"><MdOutlineGpsFixed />Manage Registered Camps</NavLink></li>
                            </ul>
                        ) : (
                            <ul className='menu p-4'>
                                <li><NavLink to="/dashboard/analytics"><MdAnalytics className='text-lg' />Analytic</NavLink></li>
                                <li><NavLink to="/dashboard/profile"><FaUserCircle />Profile</NavLink></li>
                                <li><NavLink to="/dashboard/registered-camps"><LiaCashRegisterSolid />Registered Camps</NavLink></li>
                                <li><NavLink to="/dashboard/payment-history"><FaHistory />Payment History</NavLink></li>
                            </ul>
                        )
                    }
                    <div className="divider"></div>
                    <ul className='menu p-4'>
                        <li><NavLink to="/"><IoHome />Home</NavLink></li>
                    </ul>
                </div>

                {/* Main content area */}
                <div className='flex-1 my-10 p-4 overflow-auto min-h-screen'>
                    <Outlet />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;