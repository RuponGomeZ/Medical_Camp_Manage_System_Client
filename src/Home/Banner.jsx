import React from 'react';

const Banner = ({ data }) => {
    const { image, headline, summary, date } = data
    return (
        <div className='justify-center items-center mx-auto w-4/5'>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{headline}</h2>
                    <p>{summary}</p>

                </div>
            </div>
        </div>
    );
};

export default Banner;