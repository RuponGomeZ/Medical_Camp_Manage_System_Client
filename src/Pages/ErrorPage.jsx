import Lottie, { LottiePlayer } from 'lottie-react';
import error404 from '../assets/404.json'
import { Link } from 'react-router-dom';
import { FaLeftLong } from 'react-icons/fa6';

const ErrorPage = () => {
    return (
        <div className='bg-white'>
            <Lottie animationData={error404}></Lottie>
            <Link to={"/"} className='text-black font-bold text-3xl flex justify-center items-center gap-2 hover:text-blue-500 p-0'><FaLeftLong />Return Home </Link>
        </div>
    );
};

export default ErrorPage;