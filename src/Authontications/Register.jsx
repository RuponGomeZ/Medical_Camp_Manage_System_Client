import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaGooglePlus } from 'react-icons/fa';


const Register = () => {




    const { emailSignUp, updateUserProfile, setLoading, googleLogin } = useContext(AuthContext)
    const navigate = useNavigate()
    const image_hosting_key = import.meta.env.VITE_IMG_API_KEY
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

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

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const imgUpload = async (imageFile) => {
        const response = await fetch(image_hosting_api, {
            method: 'POST',
            body: imageFile
        });
        const data = await response.json();
        console.log(data);
        return data.data.display_url;

    };

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const imageFile = new FormData();
            imageFile.append('image', data.image[0]);

            const imageUrl = await imgUpload(imageFile);
            await emailSignUp(data.email, data.password);
            await updateUserProfile(data.name, imageUrl);



            toast.success("Register Successful");
            navigate('/');
            setLoading(false)
        } catch (error) {
            toast.error(error.message);
        }
    };


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">

                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <h1 className="text-5xl font-bold">Sign up now!</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <fieldset className="fieldset">

                            <label className="label">Name*</label>
                            <input type="text" {...register("name", { required: true })} name="name" className="input" placeholder="Name" />
                            {errors.name && <span className="text-red-500">Name field is required</span>}

                            <div className=' w-full my-3'>
                                <input {...register('image', { required: true })} type="file" className="file-input file-input-ghost" />
                            </div>

                            <label className="label">Email*</label>
                            <input type="email" {...register("email", { required: true })} name="email" className="input" placeholder="Email" />
                            {errors.email && <span className="text-red-500">Email field is required</span>}


                            <label className="label">Password*</label>
                            <input type="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z].*[a-z])/
                            })} name="password" className="input" placeholder="Password" />
                            {errors.password?.type === 'required' && <p className="text-red-600">Password must be at least 6 character long</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be at least 6 character long</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Your password must contain one uppercase, one lowercase, one number and a special character </p>}



                            <div><a className="link link-hover">Forgot password?</a></div>
                            <input className="btn btn-neutral mt-4" type="submit" value="Register" />
                        </fieldset>
                    </form >
                    <button onClick={handleGoogleLogin} type='button' className='bg-red-500 btn'><FaGooglePlus className='text-xl' />
                        Google Login</button>
                    <p className='text-center pb-5 '>Already have an Account? <Link className='font-bold underline text-red-400' to={"/login"}>Login </Link></p>

                </div>
            </div>
        </div>
    );
};

export default Register;