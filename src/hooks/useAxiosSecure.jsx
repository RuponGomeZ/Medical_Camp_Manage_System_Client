import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { toast } from 'react-toastify';


const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})

const useAxiosSecure = () => {

    const navigate = useNavigate()
    const { signOutUser } = useContext(AuthContext)

    useEffect(() => {
        res => {
            return res
        }

        async error => {
            console.log(error);
            if (error.response.status === 401 || error.response.status === 403) {
                signOutUser()
                toast.error('You are not Authorized to do that. Please login again')
                navigate('/login')
            }
            return Promise.reject(error)
        }

    }, [])


};

export default useAxiosSecure;