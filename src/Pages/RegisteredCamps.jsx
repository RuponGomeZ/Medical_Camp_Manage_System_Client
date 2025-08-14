import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import FeedBackModal from '../Utilities/FeedBackModal';
import { useState } from 'react';
import MakePaymentModal from '../Components/MakePaymentModal';
import { FaArrowRight } from 'react-icons/fa';

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
        <div className='mx-2 sm:mx-4 md:ml-20'>
            <h2 className='font-bold text-xl sm:text-2xl md:text-3xl my-4 sm:my-6 md:my-10 text-center sm:text-left'>
                Camps You Have Registered!
            </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-sm sm:text-base">
                    {/* head */}
                    <thead>
                        <tr>
                            <th className='hidden sm:table-cell'>SL</th>
                            <th>Camp Name</th>
                            <th className='hidden sm:table-cell'>Camp Fees</th>
                            <th className='hidden md:table-cell'>Participant</th>
                            <th>Payment</th>
                            <th className='hidden sm:table-cell'>Status</th>
                            <th>Cancel</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registrations.map((registration, i) => (
                            <tr key={registration._id}>
                                <td className='hidden sm:table-cell'>{i + 1}</td>
                                <td className="whitespace-normal break-words max-w-[120px] sm:max-w-none">
                                    {registration.campName}
                                </td>
                                <td className='hidden sm:table-cell'>${registration.campFees}</td>
                                <td className='hidden md:table-cell'>{registration.participantName}</td>
                                <td>
                                    {registration?.paymentStatus === "unpaid" ? (
                                        <button
                                            onClick={() => {
                                                setSelectedRegistration(registration);
                                                setIsOpen(true);
                                            }}
                                            className="btn btn-xs btn-primary"
                                        >
                                            Pay
                                        </button>
                                    ) : (
                                        <span className='text-green-500'>{registration?.paymentStatus}</span>
                                    )}
                                </td>
                                <td className={`hidden sm:table-cell ${registration?.confirmationStatus === "confirmed" ? "text-green-600" : "text-orange-500"}`}>
                                    {registration.confirmationStatus}
                                </td>
                                <td>
                                    <button
                                        className={`btn btn-xs ${registration?.confirmationStatus === "confirmed" || registration?.paymentStatus === "Paid"
                                            ? "btn-disabled"
                                            : "btn-error"}`}
                                        disabled={registration?.paymentStatus === "Paid"}
                                        onClick={() => handleCancel(registration._id)}
                                    >
                                        Cancel
                                    </button>
                                </td>
                                <td>
                                    <button
                                        onClick={() => setIsModalOpen(true)}
                                        className={`btn btn-xs ${registration?.paymentStatus === "unpaid" || registration.confirmationStatus === "pending"
                                            ? "btn-disabled"
                                            : ""}`}
                                        disabled={registration?.paymentStatus === "unpaid" || registration.confirmationStatus === "pending"}
                                    >
                                        {registration.confirmationStatus === "Confirmed" ? "Feedback" : "N/A"}
                                    </button>
                                    <FeedBackModal
                                        isOpen={isModalOpen}
                                        setIsOpen={setIsModalOpen}
                                        registration={registration}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <p className='flex gap-2 items-center mt-10 lg:hidden text-blue-500'> Scroll right to see all information <FaArrowRight /> </p>

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