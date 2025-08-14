import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from '../Providers/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddACamp = () => {
    const [startDate, setStartDate] = useState(new Date());
    const axiosPublic = useAxiosPublic()
    const { user, setLoading } = useContext(AuthContext)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const image_hosting_key = import.meta.env.VITE_IMG_API_KEY
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

    const imgUpload = async (imageFile) => {
        const response = await fetch(image_hosting_api, {
            method: 'POST',
            body: imageFile
        });
        const data = await response.json();
        return data.data.display_url;
    };

    const onSubmit = async (data) => {
        setLoading(true)
        const imageFile = new FormData();
        imageFile.append('image', data.image[0]);

        const imageUrl = await imgUpload(imageFile);

        const campInfo = {
            campName: data.campName,
            date: startDate,
            description: data.description,
            image: imageUrl,
            location: data.location,
            participantCount: 0,
            campFees: parseFloat(data.campFees),
            healthCareProfessional: user.displayName,
            organizerEmail: user.email
        }

        const res = await axiosPublic.post('/addCamp', campInfo)
        if (res.data.insertedId) {
            toast.success("Camp added successfully!")
            navigate('/allCamps')
        }
        setLoading(false)
    };

    return (
        <form
            className='flex flex-col w-10/12 max-w-2xl mx-auto mt-10 md:mt-20 gap-5 border rounded-lg p-4 md:p-6'
            onSubmit={handleSubmit(onSubmit)}
        >
            <h2 className='font-bold text-2xl my-6 underline'>Add A Camp</h2>

            {/* Camp name */}
            <div>
                <p>Camp Name</p>
                <input
                    className='text-center w-full max-w-md py-2 mx-auto'
                    placeholder='Enter Camp Name'
                    {...register("campName", { required: true })}
                />
            </div>

            {/* Image upload */}
            <div>
                <p>Upload Image</p>
                <input
                    {...register('image', { required: true })}
                    type="file"
                    className="file-input file-input-ghost w-full max-w-md mx-auto"
                />
            </div>

            {/* Camp Fee */}
            <div>
                <p>Camp Fees</p>
                <input
                    type='number'
                    className='text-center w-full max-w-md py-2 mx-auto'
                    placeholder='Your Camp fee'
                    {...register("campFees", { required: true })}
                />
                {errors.campFees && <p className='text-red-600'>Camp Fee field is required</p>}
            </div>

            {/* Date And time */}
            <div>
                <p>Date & Time</p>
                <DatePicker
                    className='text-center border p-2 rounded-md w-full max-w-md mx-auto'
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    required
                />
            </div>

            {/* Location */}
            <div>
                <p>Camp location</p>
                <input
                    className='text-center w-full max-w-md py-2 mx-auto'
                    placeholder='Location'
                    {...register("location", { required: true })}
                />
                {errors.location && <p className='text-red-600'>Location field is required</p>}
            </div>

            {/* Health Care Professional */}
            <div>
                <p>Health Care Professional Name</p>
                <input
                    className='text-center w-full max-w-md py-2 mx-auto'
                    placeholder='Health Care Professional'
                    {...register("healthCareProfessional", { required: true })}
                />
                {errors.healthCareProfessional && <p className='text-red-600'>healthCareProfessional field is required</p>}
            </div>

            {/* Description */}
            <div>
                <p>Enter Description</p>
                <input
                    className='text-center w-full max-w-md py-2 mx-auto'
                    placeholder='Description'
                    {...register("description", { required: true })}
                />
                {errors.description && <p className='text-red-600'>This field is required</p>}
            </div>

            <input
                className='btn btn-primary w-fit mx-auto'
                type="submit"
            />
        </form>
    );
};

export default AddACamp;