import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import FeedBackModal from '../Utilities/FeedBackModal';
import MakePaymentModal from '../Components/MakePaymentModal';
import { FaArrowRight } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';

const RegisteredCamps = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRegistration, setSelectedRegistration] = useState(null);
    const [isOpen, setIsOpen] = useState(false);

    // Pagination state
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    const closeModal = () => {
        setIsOpen(false);
    };

    const axiosPublic = useAxiosPublic();

    const { data: registrations = [], refetch } = useQuery({
        queryKey: ['registrations'],
        queryFn: async () => {
            const response = await axiosPublic('/registered-camps', { withCredentials: true });
            return response.data;
        }
    });

    // Pagination logic
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = registrations.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(registrations.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % registrations.length;
        setItemOffset(newOffset);
    };

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
                const res = await axiosPublic.delete(`/cancel/${id}`, { withCredentials: true });
                if (res.data.deletedCount) {
                    refetch();
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your registration has been canceled.",
                        icon: "success"
                    });
                }
            }
        });
    };

    return (
        <div className='mx-2 sm:mx-4 md:ml-20'>
            <h2 className='font-bold text-xl sm:text-2xl md:text-3xl my-4 sm:my-6 md:my-10 text-center sm:text-left'>
                Camps You Have Registered!
            </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full text-sm sm:text-base">
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
                        {currentItems.map((registration, i) => (
                            <tr key={registration._id}>
                                <td className='hidden sm:table-cell'>{itemOffset + i + 1}</td>
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
                                        {registration.confirmationStatus === "confirmed" ? "Feedback" : "N/A"}
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

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    containerClassName="flex gap-2"
                    activeClassName="font-bold underline"
                />
            </div>

            <p className='flex gap-2 items-center mt-10 lg:hidden text-blue-500'>
                Scroll right to see all information <FaArrowRight />
            </p>

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
