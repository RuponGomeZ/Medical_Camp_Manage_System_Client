import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { ImCross } from "react-icons/im";


const ManageRegisteredCamps = () => {

    const axiosSecure = useAxiosSecure()

    const { data: dataOfRegisteredCamps = [] } = useQuery({
        queryKey: ['registeredCamps'],
        queryFn: async () => {
            const response = await axiosSecure.get('/manage-registered-camps')
            return response.data
        }
    })
    console.log(dataOfRegisteredCamps);

    return (
        <div>
            <div className="overflow-x-auto mx-auto block container">
                <table className="table table-zebra">
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
                        {
                            dataOfRegisteredCamps.map((dataOfRegisterCamp, i) =>
                                <tr key={dataOfRegisterCamp._id}>
                                    <th>{i + 1}</th>
                                    <td>{dataOfRegisterCamp.campName}</td>
                                    <td>{dataOfRegisterCamp.campFees}</td>
                                    <td>{dataOfRegisterCamp?.paymentStatus}</td>
                                    <td>{dataOfRegisterCamp?.confirmation}</td>
                                    <td><button><ImCross /></button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageRegisteredCamps;