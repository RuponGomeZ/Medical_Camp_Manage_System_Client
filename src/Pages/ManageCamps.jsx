import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2'
import LoadingSpinner from '../Utilities/LoadingSpinner';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import UpdateCampModal from '../Utilities/UpdateCampModal';

const ManageCamps = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const [isModalOpen, setIsModalOpen] = useState(false);


    const { data: manageCamps = [], refetch, isLoading } = useQuery({
        queryKey: ['manageCamps', user.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/manage-camp/${user.email}`)
            return response.data;
        }
    })

    if (isLoading) return <LoadingSpinner></LoadingSpinner>



    const handleDelete = (id, campName) => {

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/update-camp/${id}`)
                if (res.data.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: `Your Camp ${campName} has been deleted.`,
                        icon: "success"
                    });
                    refetch()
                }
            }
        });
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Camp Name</th>
                            <th>Date & Time</th>
                            <th>Location</th>
                            <th>Healthcare Professional</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            manageCamps.map((manageCamp, i) => <tr key={manageCamp._id}>
                                <td>{i + 1}</td>
                                <th>{manageCamp.campName}</th>
                                <td>{
                                    (() => {
                                        const d = new Date(manageCamp.date);
                                        const date = d.toLocaleDateString('en-GB').replace(/\//g, '-');
                                        return `${date}`;
                                    })()
                                }</td>
                                <td>{manageCamp.location}</td>
                                <td>{manageCamp.healthCareProfessional}</td>
                                <td className='flex gap-3'>
                                    <button onClick={() => setIsModalOpen(true)}>Edit</button>
                                    <button onClick={() => handleDelete(manageCamp._id, manageCamp.campName)}>Delete</button>
                                </td>
                                <UpdateCampModal
                                    isOpen={isModalOpen}
                                    setIsOpen={setIsModalOpen}
                                    manageCamp={manageCamp}
                                />
                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCamps;