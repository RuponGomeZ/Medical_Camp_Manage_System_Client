import React, { use, useContext, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { FaPencil } from 'react-icons/fa6';
import UpdateProfileModal from '../Utilities/UpdateProfileModal';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import LoadingSpinner from '../Utilities/LoadingSpinner';

const Profile = () => {

    const { user } = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const axiosPublic = useAxiosPublic()

    const { data: userId = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const response = await axiosPublic(`/users/${user.email}`)
            return response.data
        }
    })



    if (isLoading) return <LoadingSpinner />

    return (
        <div className=' mx-auto'>
            <img className='rounded-full w-36 h-36 items-center mx-auto' src={userId.photoURL ? userId.photoURL : user.photoURL} alt="" />
            <h3 className='font-bold text-2xl'>{userId.displayName ? userId.displayName : user.displayName}</h3>
            <p>Email: <span className='font-bold'>{userId.email ? userId.email : user.email}</span></p>
            <p>Role: <span className='font-bold'>{userId?.role}</span></p>
            {userId.Contact && <p>Contact: {userId.Contact}</p>}
            <button onClick={() => setIsModalOpen(true)} className="btn btn-outline btn-success mt-6" ><FaPencil></FaPencil> Update Profile</button>

            <UpdateProfileModal
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                userId={userId}
                refetch={refetch}
            />
        </div>
    );
};

export default Profile;