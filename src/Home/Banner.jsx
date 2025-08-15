import React from 'react';

const Banner = ({ data }) => {
    const { image, summary, date, location } = data
    return (
        <div className='justify-center items-center mx-auto w-2/5'>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img className='w-96'
                        src={image}
                        alt="" />
                </figure>
                <div className="card-body">
                    <p>{summary}</p>
                    <p className='font-bold'>Location: {location}</p>
                    <p className='font-bold'>Date: {date}</p>

                </div>
            </div>
        </div>
    );
};

export default Banner;