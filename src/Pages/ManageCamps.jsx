import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';
import LoadingSpinner from '../Utilities/LoadingSpinner';
import { useState } from 'react';
import UpdateCampModal from '../Utilities/UpdateCampModal';

const ManageCamps = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCamp, setSelectedCamp] = useState(null);

    const { data: manageCamps = [], refetch, isLoading } = useQuery({
        queryKey: ['manageCamps', user.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/manage-camp/${user.email}`);
            return response.data;
        }
    });

    if (isLoading) return <LoadingSpinner />;

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
                const res = await axiosSecure.delete(`/delete-camp/${id}`);
                if (res.data.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: `Your Camp ${campName} has been deleted.`,
                        icon: "success"
                    });
                    refetch();
                }
            }
        });
    };

    return (
        <div className="mx-auto max-w-5xl md:px-0">
            <h2 className='font-bold text-2xl md:text-3xl my-6 md:my-10'>Manage Camps</h2>

            <div className="overflow-x-auto mr-0 md:mr-4">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className="text-xs md:text-base">SL</th>
                            <th className="text-xs md:text-base">Camp Name</th>
                            <th className="text-xs hidden lg:block md:text-base">Date & Time</th>
                            <th className="text-xs md:text-base hidden sm:table-cell">Location</th>
                            <th className="text-xs md:text-base hidden  lg:block">Healthcare Professional</th>
                            <th className="text-xs md:text-base">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {manageCamps.map((manageCamp, i) => (
                            <tr key={manageCamp._id}>
                                <td className="text-xs md:text-base">{i + 1}</td>
                                <th className="text-xs md:text-base">{manageCamp.campName}</th>
                                <td className="text-xs md:text-base  hidden lg:block">
                                    {(() => {
                                        const d = new Date(manageCamp.date);
                                        return d.toLocaleDateString('en-GB').replace(/\//g, '-');
                                    })()}
                                </td>
                                <td className="text-xs md:text-base hidden sm:table-cell">{manageCamp.location}</td>
                                <td className="text-xs md:text-base hidden  lg:block">{manageCamp.healthCareProfessional}</td>
                                <td className='space-x-2'>
                                    <button
                                        onClick={() => {
                                            setIsModalOpen(true);
                                            setSelectedCamp(manageCamp);
                                        }}
                                        className="text-blue-600 hover:underline text-xs md:text-base"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(manageCamp._id, manageCamp.campName)}
                                        className="text-red-600 hover:underline text-xs md:text-base"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && selectedCamp && (
                <UpdateCampModal
                    isOpen={isModalOpen}
                    setIsOpen={setIsModalOpen}
                    manageCamp={selectedCamp}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default ManageCamps;