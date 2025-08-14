import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { FaArrowRight } from 'react-icons/fa';

const PaymentHistory = () => {

    const axiosSecure = useAxiosSecure()

    const { data: paymentHistory = [] } = useQuery({
        queryKey: ['paymentHistory'],
        queryFn: async () => {
            const response = await axiosSecure.get('/payment-status-update')
            return response.data
        }
    })

    console.log(paymentHistory);

    return (
        <div className='mx-auto '>
            <h2 className='font-bold text-3xl  my-5'>Your Payment History</h2>
            <div className="overflow-x-auto border rounded-lg">
                <table className="table table-zebra">
                    {/* head */}
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
                        {
                            paymentHistory.map((res, i) =>
                                <tr key={res._id}>
                                    <th>{i + 1}</th>
                                    <td>{res?.campName}</td>
                                    <td>{res?.price}</td>
                                    {/* Hard coded paid because this doc wouldn't be in order collection if it was not paid */}
                                    <td>Paid</td>
                                    <td className={res.confirmationStatus === "confirmed" ? "text-green-600" : "text-orange-400"}>{res?.confirmationStatus}</td>
                                    <td className='sm:hidden md:block'>{(res?.transactionId).slice(3)}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <p className='flex gap-2 items-center mt-10 lg:hidden text-blue-500'> Scroll right to see all information <FaArrowRight /> </p>

        </div>
    );
};

export default PaymentHistory;