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

const CampDetails = () => {
    const { id } = useParams();
    const axiosPublic = useAxiosPublic();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useContext(AuthContext)

    const { data: isApplied = [] } = useQuery({
        queryKey: ['applied', user?.email, id],
        queryFn: async () => {
            const response = await axiosPublic.get(`/registrations/${user.email}?campId=${id}`);
            return response.data; // Return only the data property
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
        campName, dateTime, location,
        healthcareProfessional, participantCount,
        image, campFees, description, _id
    } = camp;

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <img
                    referrerPolicy='no-referrer'
                    src={image}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div className='justify-start items-start text-left'>
                    <h1 className="text-5xl font-bold ">{campName}</h1>
                    <p className="flex gap-3"><span className='font-bold'>Camp Fee:</span> <span className='flex items-center'><FaDollarSign />{campFees}</span></p>
                    {/* <p><span className='font-bold'>Date & Time:</span> {format(new Date(dateTime), "dd/MM/yyyy")}</p> */}
                    <p>{description}</p>
                    <p className="flex gap-3 items-center"><span className='flex font-bold'>Location: </span><FaMapMarkerAlt />{location}</p>
                    <p className="flex gap-2"><span className='font-bold'>Health Care Professional:</span> <FaUserDoctor />{healthcareProfessional}</p>
                    <p className="flex gap-2 items-center"> <span className='font-bold'>Participants: </span> <GrGroup />{participantCount}</p>

                    <button className={`btn btn-primary mt-5 `} onClick={() => setIsModalOpen(true)} disabled={isApplied.length > 0}>Join Camp</button>

                    <JoinCampModal
                        isOpen={isModalOpen}
                        setIsOpen={setIsModalOpen}
                        camp={camp}
                    />
                </div>
            </div>
        </div>
    );
};

export default CampDetails;
