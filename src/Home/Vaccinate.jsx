import React from 'react';
import vaccine from '../assets/images/vaccine.jpg'

const Vaccinate = () => {
    return (
        <div>
            <h2 className='font-bold text-3xl my-20'>Vaccinate Your Child in right time</h2>
            <img className='mx-auto md:w-2/4 ' src={vaccine} alt="" />
        </div>
    );
};

export default Vaccinate;