import React from 'react';
import PopularCampCard from '../Home/popularCampCard';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AllCamps = () => {

    const axiosPublic = useAxiosPublic()

    const { data: popularCamps = [] } = useQuery({
        queryKey: ['camps'],
        queryFn: async () => {
            const res = await axiosPublic.get('/camps')
            return res.data
        }

    })


    return (
        <div>
            <div className='mt-16'>
                <div className='flex'>
                    <h2 className='my-7 font-bold text-4xl flex-1'>Popular Camps</h2>
                    <Link to={'/addCamp'} className='btn btn-primary'>Add a camp</Link>
                </div>
                <div className=' grid grid-cols-3'>
                    {
                        popularCamps.map(popularCamp => <PopularCampCard popularCamp={popularCamp} key={popularCamp._id}></PopularCampCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllCamps;