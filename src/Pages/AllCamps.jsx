import React, { useState } from 'react';
import PopularCampCard from '../Home/popularCampCard';
import { Link } from 'react-router-dom';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AllCamps = () => {

    const axiosPublic = useAxiosPublic()
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('')
    const [twoColumn, setTwoColum] = useState(false)

    const { data: popularCamps = [] } = useQuery({
        queryKey: ['camps', search, sort],
        queryFn: async () => {
            const res = await axiosPublic.get(`/camps?search=${search}&sort=${sort}`)
            return res.data
        }

    })


    return (
        <div>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-3'>
                <div className='flex  items-center'>
                    <p>Sort-By:</p>
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="select ml-5"
                    >
                        <option value="">Default</option>
                        <option value="most-registered">Most Registered</option>
                        <option value="camp-fees">Camp Fees</option>
                        <option value="camp-name">Sort by Camp Name</option>
                    </select>
                </div>
                <label className="input">
                    <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <g
                            strokeLinejoin="round"
                            strokeLinecap="round"
                            strokeWidth="2.5"
                            fill="none"
                            stroke="currentColor"
                        >
                            <circle cx="11" cy="11" r="8"></circle>
                            <path d="m21 21-4.3-4.3"></path>
                        </g>
                    </svg>
                    <input onChange={(e) => setSearch(e.target.value)} type="search" required placeholder="Search" />
                </label>
            </div>
            <div className='mt-10'>
                <div className='flex justify-between'>
                    <button
                        onClick={() => setTwoColum(prev => !prev)}
                        className="btn btn-outline mr-4 lg:block hidden"
                    >
                        {twoColumn ? '3-Column Layout' : '2-Column Layout'}
                    </button>
                </div>
                <h2 className='my-7 font-bold text-4xl flex-1'>Popular Camps</h2>
                <div className='flex justify-center'>
                    <div className={`grid gap-5 
    grid-cols-1 
    sm:grid-cols-2 
    ${twoColumn ? 'lg:grid-cols-2' : 'lg:grid-cols-3'}
  `}>
                        {
                            popularCamps.map(popularCamp => <PopularCampCard popularCamp={popularCamp} key={popularCamp._id}></PopularCampCard>)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllCamps;