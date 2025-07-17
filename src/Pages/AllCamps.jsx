import React from 'react';
import popularCamps from '../../public/popularCamps.json'
import PopularCampCard from '../Home/popularCampCard';

const AllCamps = () => {
    return (
        <div>
            <div className='mt-16'>
                <h2 className='my-7 font-bold text-4xl'>Popular Camps</h2>
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