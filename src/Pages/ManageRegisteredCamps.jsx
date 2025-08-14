import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { ImCross } from "react-icons/im";
import { SiTicktick } from "react-icons/si";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';

const ManageRegisteredCamps = () => {
    const axiosSecure = useAxiosSecure()
    const { data: dataOfRegisteredCamps = [], refetch } = useQuery({
        queryKey: ['registeredCamps'],
        queryFn: async () => {
            const response = await axiosSecure.get(`/manage-registered-camps`, { withCredentials: true })
            return response.data
        }
    })

    const handleConfirmationStatus = async (status, id) => {
        try {
            const res = await axiosSecure.patch(`/order-confirm?id=${id}&status=${status}`);
            if (res.data.registrationModified > 0 || res.data.orderModified > 0) {
                toast.success(`Status changed to ${status}`);
                refetch();
            }
        } catch (error) {
            toast.error('Failed to update status');
            console.error(error);
        }
    }

    const handleCancel = (id, campName) => {
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
                const res = await axiosSecure.delete(`/cancel-registration?id=${id}`, { withCredentials: true })
                if (res.data.deletedCount) {
                    toast.success(`Successfully canceled ${campName}`)
                    refetch()
                }
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div className="mx-4"> {/* Only added horizontal padding for mobile */}
            <h2 className='font-bold text-2xl md:text-3xl my-5'>Manage Camps that are registered</h2> {/* Only made text responsive */}
            <div className="overflow-x-auto"> {/* Added scroll for mobile */}
                <table className="table table-zebra border mx-auto"> {/* Removed ml-20 and added mx-auto */}
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Participant Name</th>
                            <th>Camp Name</th>
                            <th>Camp Fees</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Cancel</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataOfRegisteredCamps.map((dataOfRegisterCamp, i) =>
                            <tr key={dataOfRegisterCamp._id}>
                                <th>{i + 1}</th>
                                <td>{dataOfRegisterCamp?.participantName}</td>
                                <td>{dataOfRegisterCamp?.campName}</td>
                                <td>${dataOfRegisterCamp?.campFees}</td>
                                <td className={dataOfRegisterCamp.paymentStatus === "Paid" ? "text-green-600" : "text-orange-500"}>
                                    {dataOfRegisterCamp?.paymentStatus}
                                </td>
                                <td>
                                    <button onClick={() => handleConfirmationStatus("confirmed", dataOfRegisterCamp._id)}>
                                        {dataOfRegisterCamp?.confirmationStatus}
                                    </button>
                                </td>
                                <td>
                                    {dataOfRegisterCamp?.confirmationStatus === "pending" &&
                                        dataOfRegisterCamp?.paymentStatus === "unpaid" ? (
                                        <button onClick={() => handleCancel(dataOfRegisterCamp._id, dataOfRegisterCamp.campName)}>
                                            <SiTicktick className='text-green-600 font-bold text-lg' />
                                        </button>
                                    ) : (
                                        <button disabled={dataOfRegisterCamp?.paymentStatus === "paid"}>
                                            <ImCross />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRegisteredCamps;