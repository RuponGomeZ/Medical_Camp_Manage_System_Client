import React from 'react';
import Banner from './Banner';
import datas from '../../public/fake.json'
import popularCamps from '../../public/popularCamps.json'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import PopularCampCard from './popularCampCard';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <div className='mt-16'>
                <h2 className='my-7 font-bold text-4xl'>Our Successful Camps</h2>
                <div className="flex justify-center items-center ">
                    <div className='w-8/12'>
                        <Swiper
                            cssMode={true}
                            navigation={true}
                            pagination={true}
                            mousewheel={true}
                            keyboard={true}
                            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                            className="mySwiper"
                        >
                            {datas.map(data => (
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
                <div className=' grid grid-cols-3'>
                    {
                        popularCamps.slice(0, 6).map(popularCamp => <PopularCampCard popularCamp={popularCamp} key={popularCamp._id}></PopularCampCard>)
                    }
                </div>
                <Link to="/allCamps" className='btn btn-primary'>See All Camps</Link>
            </div>
        </div>
    );
};

export default Home;