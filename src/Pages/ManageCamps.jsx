import React from 'react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const ManageCamps = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)

    const { data: manageCamps = [] } = useQuery({
        queryKey: ['manageCamps', user.email],
        queryFn: async () => {
            const response = await axiosSecure.get(`/update-camp/${user.email}`)
            console.log("API Response:", response.data);
            return response.data
        }
    })

    console.log(manageCamps);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>SL</th>
                            <th>Camp Name</th>
                            <th>Date & Time</th>
                            <th>Location</th>
                            <th>Healthcare Professional</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            manageCamps.map((manageCamp, i) => <tr key={manageCamp._id}>
                                <td>{i + 1}</td>
                                <th>{manageCamp.campName}</th>
                                <td>{manageCamp.date}</td>
                                <td>{manageCamp.location}</td>
                                <td>{manageCamp.healthCareProfessional}</td>
                                <td className='flex gap-3'><button>Edit</button>
                                    <button>Delete</button>
                                </td>
                            </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageCamps;