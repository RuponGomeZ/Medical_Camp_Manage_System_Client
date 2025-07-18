import React from 'react';
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";

const AddACamp = () => {
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
        console.log(data);
        return data.data.display_url;

    };

    const onSubmit = async (data) => {
        const imageFile = new FormData();
        imageFile.append('image', data.image[0]);

        const imageUrl = await imgUpload(imageFile);


        console.log(data, imageUrl);
    };

    return (
        <form className='flex flex-col w-1/2  mx-auto mt-20 gap-5 ' onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <div className=''>
                <p>Enter Your Camp Name</p>
                <input className='text-center w-96 py-2' placeholder='Camp Name'  {...register("campName", { required: true })} />
            </div>

            {/* register your input into the hook by invoking the "register" function */}

            <p>Upload Image</p>
            <div className=' w-full '>
                <input {...register('image', { required: true })} type="file" className="file-input file-input-ghost" />
            </div>


            {/* register your input into the hook by invoking the "register" function */}
            <div className=''>
                <p>Enter Your Camp Name</p>
                <input className='text-center w-96 py-2' placeholder='Date & Time'  {...register("date", { required: true })} />
            </div>

            {/* register your input into the hook by invoking the "register" function */}
            <div className=''>
                <p>Enter Your Camp Name</p>
                <input className='text-center w-96 py-2' placeholder='Location'  {...register("location", { required: true })} />
            </div>

            {/* register your input into the hook by invoking the "register" function */}
            <div className=''>
                <p>Health Care Professional Name</p>
                <input className='text-center w-96 py-2' placeholder='Health Care Professional'  {...register("healthCareProfessional", { required: true })} />
            </div>

            {/* register your input into the hook by invoking the "register" function
            <div className=''>
                <p>P</p>
                <input className='text-center w-96 py-2' placeholder='P'  {...register("participantCount", { required: true })} />
            </div> */}

            {/* register your input into the hook by invoking the "register" function */}
            <div className=''>
                <p>Enter Description</p>
                <input className='text-center w-96 py-2' placeholder='Description'  {...register("description", { required: true })} />
            </div>


            {errors.exampleRequired && <p>This field is required</p>}

            <input type="submit" />
        </form>
    );
};

export default AddACamp;