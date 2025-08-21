import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import medicalShield from '../../public/MedicalShield.json';
import Lottie from 'lottie-react';
import { FaGooglePlus } from 'react-icons/fa';
import { AuthContext } from '../Providers/AuthProvider';
import LoadingSpinner from '../Utilities/LoadingSpinner';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PageTitle from '../Components/PageTitle';

const Login = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { googleLogin, setLoading, loading, emailLogin } = useContext(AuthContext);

    const onSubmit = (data) => {
        emailLogin(data.email, data.password);
        setLoading(false);
        navigate('/');
        toast.success('Login Successful');
    };

    const handleGoogleLogin = () => {
        googleLogin()
            .then(() => {
                toast.success("Login Successful");
                setLoading(false);
                navigate('/');
            })
            .catch(error => {
                toast.error(error);
                setLoading(false);
            });
    };

    if (loading) return <LoadingSpinner />;

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-24 px-4 md:px-10 min-h-screen">
            {/* Form Section */}
            <form
                className="flex flex-col gap-5 items-center w-full md:w-5/12 lg:w-4/12"
                onSubmit={handleSubmit(onSubmit)}
            >
                <PageTitle title="Login"></PageTitle>

                <p className="font-bold text-2xl md:text-3xl mb-3 text-center">Login to your account</p>

                <input
                    className="w-full py-2 px-3 border rounded text-center"
                    placeholder="Your email"
                    {...register("email", { required: true })}
                />
                {errors?.email && <span className="text-red-500 text-sm">Enter a valid email</span>}

                <input
                    className="w-full py-2 px-3 border rounded text-center"
                    type="password"
                    placeholder="Your password"
                    {...register("password", { required: true })}
                />
                {errors?.password && <span className="text-red-500 text-sm">This field is required</span>}

                <input className="btn btn-primary w-full" type="submit" value="Login" />

                <button
                    onClick={handleGoogleLogin}
                    type="button"
                    className="bg-red-500 text-white btn w-full flex items-center justify-center gap-2"
                >
                    <FaGooglePlus className="text-xl" />
                    Google Login
                </button>

                <p className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link className="font-bold underline text-red-400" to={"/register"}>
                        Register Now
                    </Link>
                </p>
            </form>

            {/* Animation Section */}
            <Lottie
                className="w-8/12 md:w-5/12 lg:w-4/12 max-w-md"
                animationData={medicalShield}
            />
        </div>
    );
};

export default Login;
