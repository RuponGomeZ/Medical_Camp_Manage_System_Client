import React from 'react';
import { Link } from 'react-router-dom';

const PopularCampCard = ({ popularCamp }) => {
    const { image, campName, campFees, dateTime, location, healthcareProfessional, participantCount, _id } = popularCamp

    return (
        <div>
            <div className="card bg-base-100 w-96 shadow-sm">
                <figure>
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">Camp Name: {campName}</h2>
                    <div className='my-4 text-left'>
                        <p><span className='font-bold'>Location:</span>  {location}</p>
                        <p><span className='font-bold'>Date & Time:</span> {
                            (() => {
                                const d = new Date(dateTime);
                                const date = d.toLocaleDateString('en-GB').replace(/\//g, '-');
                                const time = d.toLocaleTimeString('en-US', {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: true
                                });
                                return `${date} ${time}`;
                            })()
                        }</p>
                        <p><span className='font-bold'>Healthcare Professional</span> : {healthcareProfessional}</p>
                        <div className='flex mt-7'>
                            <p><span className='font-bold'>Camp Fee</span> : {campFees}</p>
                            <p><span className='font-bold'>Participants:</span>  {participantCount}</p>
                        </div>
                    </div>
                    <div className="card-actions justify-center">
                        <Link to={`/campDetails/${_id}`} className="underline font-bold text-blue-300">View Details</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PopularCampCard;