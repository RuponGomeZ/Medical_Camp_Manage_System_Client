import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination } from 'swiper/modules';
import placeholder from '../assets/images/placeholder.jpg'


const FeedBacks = () => {
    const axiosPublic = useAxiosPublic()
    const { data: feedbacks = [] } = useQuery({
        queryKey: ['feedback'],
        queryFn: async () => {
            const response = await axiosPublic('/feedback')
            return response.data
        }
    })
    console.log(feedbacks);
    return (
        <div>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Pagination]}
                className="mySwiper"

                breakpoints={{
                    0: {
                        slidesPerView: 1,
                    },
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {
                    feedbacks.map(feedback =>
                        <SwiperSlide>
                            <div className=' mx-auto  container p-6 my-5'>
                                <div className='border border-dotted bg-gray-900 p-2 rounded-3xl'>
                                    <img className='rounded-full w-16 mx-auto relative bottom-8' src={feedback.participantPhotoURL || placeholder} alt="" />
                                    <p className='mx-2'>{(feedback.comment).slice(0, 120)}. . . . .</p>
                                    <div className='flex justify-center gap-3 mt-3'>
                                        <div className="rating">
                                            {
                                                [1, 2, 3, 4, 5].map((star) => (
                                                    <div
                                                        key={star}
                                                        className={`mask mask-star ${star <= parseInt(feedback.rating) ? 'bg-white ' : 'bg-gray-500'}`}
                                                        aria-label={`${star} star`}
                                                    ></div>
                                                ))
                                            }
                                        </div>

                                        <p className='font-bold text-blue-400'>{feedback.participantName}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }
            </Swiper>
        </div>
    );
};

export default FeedBacks;