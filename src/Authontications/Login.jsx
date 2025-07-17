import React, { useContext } from 'react';
import { useForm } from "react-hook-form"
import medicalShield from '../../public/MedicalShield.json'
import Lottie from 'lottie-react';
import { FaGooglePlus } from 'react-icons/fa';
import { AuthContext } from '../Providers/AuthProvider';
import LoadingSpinner from '../Utilities/LoadingSpinner';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()



    const { googleLogin, setLoading, loading, user, emailLogin } = useContext(AuthContext)

    const onSubmit = (data) => {
        emailLogin(data.email, data.password)
        setLoading(false)
        navigate('/')
        toast.success('Login Successful')
    }
    const handleGoogleLogin = () => {
        googleLogin()
            .then(res => {
                console.log(res);
                toast.success("Login Successful")
                setLoading(false)
                navigate('/')

            })
            .catch(error => {
                toast.error(error)
                setLoading(false)
            })
    }

    if (loading) return <LoadingSpinner></LoadingSpinner>

    return (
        <div className='mt-20 flex gap-24 items-center mx-auto w-full justify-center'>
            <form className='flex flex-col gap-5 items-center' onSubmit={handleSubmit(onSubmit)}>
                <p className='font-bold text-3xl mb-5'>Login to your account</p>
                {/* register your input into the hook by invoking the "register" function */}
                <input className='w-full py-2 text-center' placeholder='Your email' {...register("email")} />
                {errors?.email && <span>Enter a valid email</span>}

                {/* include validation with required or other standard HTML validation rules */}
                <input className='w-full py-2 text-center' type='password' placeholder='Your password' {...register("password", { required: true })} />
                {/* errors will return when field validation fails  */}
                {errors.exampleRequired && <span>This field is required</span>}

                <input className='btn-primary btn' type="submit" />
                <button onClick={handleGoogleLogin} type='button' className='bg-red-500 btn'><FaGooglePlus className='text-xl' />
                    Google Login</button>
                <p>Don't have an account? <Link className='font-bold underline text-red-400' to={"/register"}>Register Now</Link></p>
            </form>
            <Lottie className='w-4/12' animationData={medicalShield}></Lottie>
        </div>
    );
};

export default Login;