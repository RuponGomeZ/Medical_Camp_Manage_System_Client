import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import FeedBackModal from '../Utilities/FeedBackModal';
import { useState } from 'react';
import MakePaymentModal from '../Components/MakePaymentModal';

const RegisteredCamps = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRegistration, setSelectedRegistration] = useState(null)
    let [isOpen, setIsOpen] = useState(false)

    const closeModal = () => {
        setIsOpen(false)
    }
    const axiosPublic = useAxiosPublic()

    const { data: registrations = [], refetch } = useQuery({
        queryKey: ['registrations'],
        queryFn: async () => {
            const response = await axiosPublic('/registered-camps', { withCredentials: true })
            return response.data;
        }
    })
    // console.log(selectedRegistration);

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
        <div className='ml-20'>
            <h2 className='font-bold text-3xl my-10 '>Camps You Have Registered!</h2>
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
                                    <td>{registration?.paymentStatus === "unpaid" ? <button onClick={() => {
                                        setSelectedRegistration(registration);
                                        setIsOpen(true)
                                    }
                                    }>Pay Now</button> : <p className='text-green-500'>{registration?.paymentStatus}</p>}

                                    </td>
                                    <td>{registration.confirmationStatus}</td>
                                    <td><button className={registration?.confirmationStatus === "confirmed" ? "bg-gray-500 px-2 rounded hover:cursor-not-allowed" : `bg-red-600 px-2 rounded `} disabled={registration?.confirmationStatus === "confirmed"} onClick={() => handleCancel(registration._id)}>Cancel</button></td>
                                    <td>
                                        <button onClick={() => setIsModalOpen(true)} className={registration?.confirmationStatus === "confirmed" ? " px-2 rounded" : " px-2 rounded hover:cursor-not-allowed"}>
                                            {registration.confirmationStatus === "confirmed" ? "FeedBack" : "N/A"}
                                        </button>
                                        <FeedBackModal
                                            isOpen={isModalOpen}
                                            setIsOpen={setIsModalOpen}
                                            registration={registration}
                                        />
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            {selectedRegistration && (
                <MakePaymentModal
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    registration={selectedRegistration}
                    refetch={refetch}
                />
            )}
        </div>
    );
};

export default RegisteredCamps;