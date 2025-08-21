import React, { useState } from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaArrowRight } from 'react-icons/fa';
import ReactPaginate from 'react-paginate';
import PageTitle from './PageTitle';

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();

    // Pagination state
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;

    const { data: paymentHistory = [] } = useQuery({
        queryKey: ['paymentHistory'],
        queryFn: async () => {
            const response = await axiosSecure.get('/payment-status-update');
            return response.data;
        }
    });

    // Slice for current page
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = paymentHistory.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(paymentHistory.length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % paymentHistory.length;
        setItemOffset(newOffset);
    };

    return (
        <div className='mx-auto'>
            <PageTitle title="Payment History"></PageTitle>
            <h2 className='font-bold text-3xl my-5'>Your Payment History</h2>
            <div className="overflow-x-auto border rounded-lg">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Camp Name</th>
                            <th>Fees</th>
                            <th>Payment Status</th>
                            <th>Confirmation Status</th>
                            <th className='sm:hidden md:block'>Transaction Id</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((res, i) => (
                            <tr key={res._id}>
                                <th>{itemOffset + i + 1}</th>
                                <td>{res?.campName}</td>
                                <td>{res?.price}</td>
                                <td>Paid</td>
                                <td className={res.confirmationStatus === "confirmed" ? "text-green-600" : "text-orange-400"}>
                                    {res?.confirmationStatus}
                                </td>
                                <td className='sm:hidden md:block'>{(res?.transactionId).slice(3)}</td>
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
        </div>
    );
};

export default PaymentHistory;
