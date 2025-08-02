import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';

const RegisteredCamps = () => {

    const axiosPublic = useAxiosPublic()

    const { data: registrations = [], refetch } = useQuery({
        queryKey: ['registrations'],
        queryFn: async () => {
            const response = await axiosPublic('/registered-camps', { withCredentials: true })
            return response.data;
        }
    })
    console.log(registrations);

    const handleCancel = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancel it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/cancel/${id}`, { withCredentials: true })
                if (res.data.deletedCount) {
                    console.log(res.data);
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your registration has been canceled.",
                        icon: "success"
                    });
                }
            }
        });
    }

    return (
        <div>
            <h2 className='font-bold text-3xl'>Camps You Have Registered!</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Camp Name</th>
                            <th>Camp Fees</th>
                            <th>Participant Name</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th>Cancel</th>
                            <th>FeedBack</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            registrations.map((registration, i) =>
                                <tr key={registration._id}>
                                    <th>{i + 1}</th>
                                    <td>{registration.campName}</td>
                                    <td>{registration.campFees}</td>
                                    <td>{registration.participantName}</td>
                                    <td>{registration?.paymentStatus === "unpaid" ? <button>Pay Now</button> : <p className='text-green-500'>{registration?.paymentStatus}</p>}</td>
                                    <td>{registration.confirmationStatus}</td>
                                    <td><button className={registration?.confirmationStatus === "confirmed" ? "bg-gray-500 px-2 rounded hover:cursor-not-allowed" : `bg-red-600 px-2 rounded `} disabled={registration?.confirmationStatus === "confirmed"} onClick={() => handleCancel(registration._id)}>Cancel</button></td>
                                    <td><button>FeedBack</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RegisteredCamps;