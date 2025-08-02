import React, { useContext } from 'react';
import ReactDOM from "react-dom";
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
        watch,
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
        // console.log(data);
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
        <form className='flex flex-col w-1/2  mx-auto mt-20 gap-5 ' onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <div>
                <p> Camp Name</p>
                <input className='text-center w-96 py-2' placeholder='Enter Camp Name'  {...register("campName", { required: true })} />
            </div>

            {/* register your input into the hook by invoking the "register" function */}
            <p>Upload Image</p>
            <div className=' w-full '>
                <input {...register('image', { required: true })} type="file" className="file-input file-input-ghost" />
            </div>


            {/* register your input into the hook by invoking the "register" function */}
            <div>
                <p>Camp Fee</p>
                <input type='number' className='text-center w-96 py-2' placeholder='Your Camp fee'  {...register("campFees", { required: true })} />
            </div>
            {errors.campFees && <p className='text-red-600'>Camp Fee field is required</p>}


            {/* register your input into the hook by invoking the "register" function */}
            <div>
                <p> Date & Time</p>
                <DatePicker className='text-center border p-2 rounded-md' selected={startDate} onChange={(date) => setStartDate(date)} required />
            </div>


            {/* register your input into the hook by invoking the "register" function */}
            <div>
                <p>Camp location</p>
                <input className='text-center w-96 py-2' placeholder='Location'  {...register("location", { required: true })} />
            </div>
            {errors.location && <p className='text-red-600'>Location field is required</p>}


            {/* Health Care Professional */}
            <div>
                <p>Health Care Professional Name</p>
                <input className='text-center w-96 py-2' value={user.displayName} placeholder='Health Care Professional'  {...register("healthCareProfessional", { required: true })} />
            </div>
            {errors.healthCareProfessional && <p className='text-red-600'>healthCareProfessional field is required</p>}


            {/* Description */}
            <div>
                <p>Enter Description</p>
                <input className='text-center w-96 py-2' placeholder='Description'  {...register("description", { required: true })} />
            </div>
            {errors.description && <p className='text-red-600'>This field is required</p>}

            <input className='btn btn-primary w-fit mx-auto' type="submit" />
        </form>
    );
};

export default AddACamp;