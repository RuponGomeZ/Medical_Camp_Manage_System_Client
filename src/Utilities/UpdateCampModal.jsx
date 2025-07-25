import React from 'react';
import { useContext, useState } from 'react';
import { Dialog } from '@headlessui/react';
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { AuthContext } from '../Providers/AuthProvider';
import { toast } from 'react-toastify';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';




const UpdateCampModal = ({ isOpen, setIsOpen, manageCamp, refetch }) => {
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const { user, loading, setLoading } = useContext(AuthContext)
    const [startDate, setStartDate] = useState(new Date());



    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm();

    const {
        campName,
        dateTime,
        location,
        healthCareProfessional,
        campFee,
        _id, image
    } = manageCamp;

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

        let imageUrl;
        if (data.image?.[0]) {
            const imageFile = new FormData();
            imageFile.append('image', data.image[0]);
            imageUrl = await imgUpload(imageFile);
        }

        const campInfo = {
            campName: data.campName,
            date: startDate,
            description: data.description,
            image: imageUrl || image,
            location: data.location,
            campFee: parseFloat(data.campFee),
            healthCareProfessional: user.displayName,
        }

        const res = await axiosPublic.patch(`/update-camp/${_id}`, campInfo, {
            withCredentials: true
        })
        if (res.data.modifiedCount) {
            console.log(res.data.modifiedCount);
            setIsOpen(false);
            toast.success(`Successfully updated ${campName}`)
            setLoading(false)
            refetch()
        }
        else {
            toast.error(res.data.message)
            setLoading(false)

        }

    };

    if (loading) return <LoadingSpinner />

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <Dialog.Panel className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded bg-gray-600 p-3 ml-6 shadow-lg">

                    <form className='flex flex-col   mx-auto  gap-5 text-center px-4'
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <h3 className='font-bold text-3xl'>Update your Camp details for {campName}</h3>

                        {/* Camp name */}
                        <div>
                            <p>Camp Name</p>
                            <input className='text-center w-96 py-2  ' defaultValue={campName}  {...register("campName", { required: true })} />
                        </div>


                        {/* Image */}
                        <p>Upload Image</p>
                        <div className=' w-full '>
                            <input {...register('image')} type="file" className="file-input file-input-ghost" />
                        </div>


                        {/* Camp Fee */}
                        <div>
                            <p>Camp Fee</p>
                            <input type='number' defaultValue={campFee} className='text-center w-96 py-2 '  {...register("campFee", { required: true })} />
                        </div>


                        {/* Date */}
                        <DatePicker
                            className="text-center border p-2 rounded-md"
                            selected={dateTime ? new Date(dateTime) : startDate}
                            onChange={(date) => setStartDate(date)}
                            required
                        />

                        {/* Location */}
                        <div>
                            <p>Camp location</p>
                            <input className='text-center w-96 py-2  ' defaultValue={location}  {...register("location", { required: true })} />
                        </div>


                        {/* Health Care Professional */}
                        <div>
                            <p>Health Care Professional Name</p>
                            <input className='text-center w-96 py-2  ' defaultValue={healthCareProfessional} placeholder='Health Care Professional'  {...register("healthCareProfessional", { required: true })} />
                        </div>




                        <input className='btn btn-primary w-fit mx-auto' type="submit" />
                    </form>



                    <div className="flex justify-end gap-2">
                        <button className="btn hover:bg-red-600 btn-sm" onClick={() => setIsOpen(false)}>Cancel</button>
                        {/* <button className="btn btn-primary btn-sm" onClick={handleConfirm}>Confirm</button> */}
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default UpdateCampModal;