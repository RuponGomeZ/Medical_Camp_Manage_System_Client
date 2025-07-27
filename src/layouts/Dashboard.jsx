import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { MdAutoFixHigh, MdCampaign, MdOutlineGpsFixed } from "react-icons/md";
import { IoHome } from "react-icons/io5";



const Dashboard = () => {
    return (
        <div className='flex'>
            <div className='min-h-screen w-80 bg-gray-500'>
                <ul className='menu p-4'>
                    <li><NavLink to={"/dashboard/profile"}><FaUserCircle />Profile</NavLink></li>
                    <li><NavLink to={"/dashboard/addCamp"}><MdCampaign className='text-xl' />Add a Camp</NavLink></li>
                    <li><NavLink to={"/dashboard/manage-camp"}><MdAutoFixHigh className='text-lg' />Manage Camps</NavLink></li>
                    <li><NavLink to={"/dashboard/manageRegisteredCamp"}><MdOutlineGpsFixed />Manage Registered Camps</NavLink></li>
                </ul>
                <div className="divider"></div>
                <ul className='menu p-4'>
                    <li><NavLink to={"/"}> <IoHome />Home</NavLink></li>
                </ul>
            </div>
            <div className='flex items-center mx-auto text-center container'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;