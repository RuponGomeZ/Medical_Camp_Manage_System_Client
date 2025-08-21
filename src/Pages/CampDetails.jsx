import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../Utilities/LoadingSpinner';
import { FaDollarSign, FaMapMarkerAlt } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { FaUserDoctor } from "react-icons/fa6";
import { format } from "date-fns";
import { AuthContext } from '../Providers/AuthProvider';
import Modal from '../Utilities/Modal';
import placeHolder from '../assets/images/placeholder.jpg';
import PageTitle from '../Components/PageTitle';

const CampDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(AuthContext);

    const { data: isApplied = [] } = useQuery({
        queryKey: ['applied', user?.email, id],
        queryFn: async () => {
            const response = await axiosPublic.get(`/registrations/${user.email}?campId=${id}`);
            return response.data;
        }
    });

    const { data: camp = {}, isLoading } = useQuery({
        queryKey: ['camp'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/camp-details/${id}`);
            return res.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

    const {
        campName, date: dateTime, location,
        healthCareProfessional, participantCount,
        image, campFees, description, _id, organizerEmail
    } = camp;

    return (
        <div className="bg-base-200 min-h-screen py-8 px-4 sm:px-6">
            <PageTitle title="Camp Details"></PageTitle>

            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Image Section */}
                    <div className="w-full lg:w-1/2 flex justify-center">
                        <img
                            referrerPolicy='no-referrer'
                            src={image || placeHolder}
                            className="w-full max-w-md rounded-lg shadow-2xl object-cover"
                            alt={campName}
                        />
                    </div>

                    {/* Details Section */}
                    <div className="w-full lg:w-1/2 space-y-4">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold ">{campName}</h1>

                        <div className="space-y-3">
                            <p className="flex flex-wrap items-center gap-2">
                                <span className='font-bold'>Camp Fee:</span>
                                <span className='flex items-center gap-1'>
                                    <FaDollarSign className="text-sm" />
                                    {campFees}
                                </span>
                            </p>

                            <p className=' flex gap-2'><span className='font-bold'>Date & Time: </span> {
                                (() => {
                                    const d = new Date(dateTime);
                                    const date = d.toLocaleDateString('en-GB').replace(/\//g, '-')
                                    return `${date} `;
                                })()
                            }</p>

                            <p className="text-justify">{description}</p>

                            <p className="flex flex-wrap items-center gap-2">
                                <span className='font-bold'>Location:</span>
                                <span className='flex items-center gap-1'>
                                    <FaMapMarkerAlt />
                                    {location}
                                </span>
                            </p>

                            <p className="flex flex-wrap items-center gap-2">
                                <span className='font-bold'>Health Care Professional:</span>
                                <span className='flex items-center gap-1'>
                                    <FaUserDoctor />
                                    {healthCareProfessional}
                                </span>
                            </p>

                            <p className="flex flex-wrap items-center gap-2">
                                <span className='font-bold'>Participants:</span>
                                <span className='flex items-center gap-1'>
                                    <GrGroup />
                                    {participantCount}
                                </span>
                            </p>
                        </div>

                        <button
                            className="btn btn-primary w-full sm:w-auto mt-6"
                            onClick={() => setIsModalOpen(true)}
                            disabled={isApplied.length > 0 || organizerEmail === user?.email}
                        >
                            Join Camp
                        </button>

                        <Modal
                            isOpen={isModalOpen}
                            setIsOpen={setIsModalOpen}
                            camp={camp}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampDetails;