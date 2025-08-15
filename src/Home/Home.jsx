import React from 'react';
import Banner from './Banner';
import datas from '../../public/fake.json';
// import popularCamps from '../../public/popularCamps.json'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import PopularCampCard from './popularCampCard';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../hooks/useAxiosPublic';
import FeedBacks from '../Utilities/FeedBacks';
import Vaccinate from './Vaccinate';

const Home = () => {
    const axiosPublic = useAxiosPublic();
    const { data: popularCamps = [] } = useQuery({
        queryKey: ['popularCamps'],
        queryFn: async () => {
            const response = await axiosPublic.get('/camps');
            return response.data;
        }
    });

    const { data: successfulCamps = [] } = useQuery({
        queryKey: ['successfulCamp'],
        queryFn: async () => {
            const res = await axiosPublic('/successful-camps')
            return res.data
        }
    })
    console.log(successfulCamps);

    return (
        <div>
            <div className='mt-16'>
                <h2 className='my-7 font-bold text-4xl md:text-center sm:text-left px-4'>Our Successful Camps</h2>
                <div className="flex justify-center items-center">
                    <div className='w-full md:w-10/12 lg:w-8/12 px-4'>
                        <Swiper
                            cssMode={true}
                            navigation={true}
                            pagination={true}
                            mousewheel={true}
                            keyboard={true}
                            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                            className="mySwiper"
                        >
                            {successfulCamps.map(data => (
                                <SwiperSlide key={data.id} className="flex justify-center items-center">
                                    <Banner data={data} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>

            <div className='mt-16'>
                <h2 className='my-7 font-bold text-4xl'>Popular Camps</h2>
                <div className='grid md:grid-cols-2 lg:grid-cols-3'>
                    {popularCamps
                        .sort((a, b) => b.participantCount - a.participantCount)
                        .slice(0, 6)
                        .map(popularCamp => (
                            <PopularCampCard
                                popularCamp={popularCamp}
                                key={popularCamp._id}
                            />
                        ))}
                </div>
                <Link to="/allCamps" className='btn btn-primary'>
                    See All Camps
                </Link>
            </div>

            {/* FeedBack section */}
            <div className='my-36'>
                <h2 className='font-bold text-4xl'>Feedbacks & Ratings</h2>
                <FeedBacks></FeedBacks>
            </div>

            {/* Vaccine */}
            <div className='mb-20'>
                <Vaccinate></Vaccinate>
            </div>
        </div>
    );
};

export default Home;