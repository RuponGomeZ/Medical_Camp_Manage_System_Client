import React from 'react';
import { useQuery } from '@tanstack/react-query'
import axios from 'axios';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../Utilities/LoadingSpinner';
import { FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { FaUserDoctor } from "react-icons/fa6";
import { format } from "date-fns";


const CampDetails = () => {

    const { id } = useParams()
    console.log(id);

    const axiosPublic = useAxiosPublic()

    const { data: camp = [], isLoading } = useQuery({
        queryKey: ['camp'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/camp-details/${id}`)
            return res.data
        }
    })

    if (isLoading) return <LoadingSpinner />

    console.log(camp);

    const { campName, dateTime, location, healthcareProfessional, participantCount, image, campFees, description } = camp

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp"
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div className='justify-start items-start text-left'>
                    <h1 className="text-5xl font-bold ">{campName}</h1>
                    <p className=" flex gap-3"><span className='font-bold'>Camp Fee:</span> <span className='flex items-center'><FaDollarSign></FaDollarSign>{campFees}</span></p>
                    <p className=""><span className='font-bold'>Date & Time:</span> {format(new Date(dateTime), "dd/MM/yyyy")}</p>
                    <p className="">{description}</p>
                    <p className="flex gap-3 items-center"><span className='flex font-bold'>Location: </span><FaMapMarkerAlt />{location}</p>
                    <p className="flex gap-2"><span className='font-bold'>Health Care Professional:</span> <FaUserDoctor />
                        {healthcareProfessional}</p>
                    <p className=" flex gap-2 items-center"> <span className='font-bold'>Participants: </span > <GrGroup />
                        {participantCount}</p>
                    <button className="btn btn-primary mt-5">Join Camp</button>
                </div>
            </div>
        </div>
    );
};

export default CampDetails;