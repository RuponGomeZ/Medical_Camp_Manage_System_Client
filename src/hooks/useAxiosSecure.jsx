import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import { toast } from 'react-toastify';


const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
})
let toastTimeout = null;
const useAxiosSecure = () => {

    const navigate = useNavigate()
    const { signOutUser } = useContext(AuthContext)

    useEffect(() => {
        axiosSecure.interceptors.response.use(

            res => {
                return res
            },
            async error => {
                console.log(error);
                if (error.response.status === 401 || error.response.status === 403) {
                    signOutUser()
                    if (!toastTimeout) {
                        toast.error('You are not authorized to do that. Please login again.');
                        toastTimeout = setTimeout(() => {
                            toastTimeout = null;
                        }, 3000);
                    }
                    navigate('/login')
                }
                return Promise.reject(error)
            }
        )

    }, [signOutUser, navigate])

    return axiosSecure

};

export default useAxiosSecure;