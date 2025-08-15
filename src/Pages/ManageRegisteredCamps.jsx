import { useQuery } from '@tanstack/react-query';
import React, { useState, useContext } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { ImCross } from "react-icons/im";
import { SiTicktick } from "react-icons/si";
import { toast } from 'react-toastify';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';
import ReactPaginate from 'react-paginate';

const ManageRegisteredCamps = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);

    // Pagination state
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    const { data: dataOfRegisteredCamps = [], refetch } = useQuery({
        queryKey: ['registeredCamps', user?.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/manage-registered-camps`, { withCredentials: true });
            return response.data;
        }
    });

    const endOffset = itemOffset + itemsPerPage;
    const currentItems = dataOfRegisteredCamps.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(dataOfRegisteredCamps.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % dataOfRegisteredCamps.length;
        setItemOffset(newOffset);
    };

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
    };

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
                const res = await axiosSecure.delete(`/cancel-registration?id=${id}`);
                if (res.data.deletedCount) {
                    toast.success(`Successfully canceled ${campName}`);
                    refetch();
                }
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    };

    return (
        <div className="mx-4">
            <h2 className='font-bold text-2xl md:text-3xl my-5'>
                Manage Camps that are registered
            </h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra border mx-auto">
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
                        {currentItems.map((dataOfRegisterCamp, i) => (
                            <tr key={dataOfRegisterCamp._id}>
                                <th>{itemOffset + i + 1}</th>
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
        </div>
    );
};

export default ManageRegisteredCamps;
