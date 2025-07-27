import React, { useContext, useEffect } from 'react';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../Providers/AuthProvider';
import { useForm } from "react-hook-form";
import LoadingSpinner from './LoadingSpinner';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-toastify';


const UpdateProfileModal = ({ isOpen, setIsOpen, userId, refetch }) => {

    const axiosPublic = useAxiosPublic()
    const { user, loading, setLoading, updateUserProfile } = useContext(AuthContext)

    if (!userId) {
        refetch()
    }

    console.log(userId);

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
        return data.data.display_url;

    };


    const onSubmit = async (data) => {
        setLoading(true)
        let imageUrl = user?.photoURL;
        if (data.image?.[0]) {
            const imageFile = new FormData();
            imageFile.append('image', data.image[0]);
            imageUrl = await imgUpload(imageFile);
        }

        const campInfo = {
            displayName: data.name,
            email: data.email,
            photoURL: imageUrl,
            ...(data.phoneNumber && { Contact: data.phoneNumber }),
        }


        updateUserProfile(data.name, imageUrl)
            .then(async () => {
                const response = await axiosPublic.patch(`/users/${userId._id}`, campInfo)
                console.log(response.data);
                if (response.data.modifiedCount) {
                    toast.success("Profile Updated Successfully")
                    setLoading(false)
                    refetch()
                    setIsOpen(false)
                }

            })
            .catch(error => {
                console.log(error)
                toast.error("Something went wrong!")
                setLoading(false)
                setIsOpen(false)

            })
    };

    if (loading) return <LoadingSpinner />

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4 mx-auto container">
                <Dialog.Panel className="w-96 max-w-3xl max-h-[90vh] overflow-y-auto rounded bg-gray-600 p-3 ml-36 shadow-lg">



                    <form onSubmit={handleSubmit(onSubmit)} className="items-center mx-auto p-4 px-6">
                        <fieldset className="fieldset">

                            <h2 className='font-bold text-3xl text-center'>Update Your Profile</h2>

                            <label className="label">Name</label>
                            <input type="text" defaultValue={user?.displayName} {...register("name")} name="name" className="input" placeholder="Name" />
                            {errors.name && <span className="text-red-500">Name field is required</span>}

                            <label className="label mt-3">Update Profile Photo</label>
                            <div className=' w-full my-3'>
                                <input {...register('image')} type="file" className="file-input file-input-ghost" />
                            </div>

                            <label className="label">Phone Number</label>
                            <input type="text" defaultValue={user?.phoneNumber} {...register("phoneNumber")} name="phoneNumber" className="input" placeholder="Phone Number" />
                            {errors.name && <span className="text-red-500">Name field is required</span>}

                            <input className="btn btn-outline btn-success w-fit mx-auto mt-4" type="submit" value="Update" />
                        </fieldset>
                    </form >

                    <div className="flex justify-end gap-2">
                        <button className="btn hover:bg-red-600 btn-sm" onClick={() => setIsOpen(false)}>Cancel</button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};

export default UpdateProfileModal;